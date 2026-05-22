import { NextResponse } from "next/server"
import { z } from "zod"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const MOBILE_SERVICE_FEE = 35
const MAX_BODY_BYTES = 12_000

const serviceValues = [
  "oil-change",
  "brake-service",
  "battery-replacement",
  "diagnostic-scan",
  "suspension",
  "tune-up",
  "electrical",
  "timing-belt",
  "timing-chain",
  "inspection",
  "general",
] as const

type ServiceValue = (typeof serviceValues)[number]

const services: Record<ServiceValue, { label: string; priceRange: string }> = {
  "oil-change": { label: "Oil Change", priceRange: "$80-$120" },
  "brake-service": { label: "Brake Service", priceRange: "$250-$600" },
  "battery-replacement": { label: "Battery Replacement", priceRange: "$180-$350" },
  "diagnostic-scan": { label: "Diagnostic Scan", priceRange: "$80-$140" },
  suspension: { label: "Suspension Repair", priceRange: "$225-$400" },
  "tune-up": { label: "Tune-Up", priceRange: "$110-$200" },
  electrical: { label: "Electrical Systems", priceRange: "$135-$280" },
  "timing-belt": { label: "Timing Belt Replacement", priceRange: "$450-$850" },
  "timing-chain": { label: "Timing Chain Service", priceRange: "$550-$1200" },
  inspection: { label: "Vehicle Inspection", priceRange: "$65-$120" },
  general: { label: "General Repair", priceRange: "$90-$250" },
}

const timeSlots = [
  "9:00-11:00 AM",
  "11:00-1:00 PM",
  "1:00-3:00 PM",
  "3:00-5:00 PM",
  "After 5 PM (flexible)",
] as const

const legacyTimeSlotMap: Record<string, (typeof timeSlots)[number]> = {
  "9:00–11:00 AM": "9:00-11:00 AM",
  "11:00–1:00 PM": "11:00-1:00 PM",
  "1:00–3:00 PM": "1:00-3:00 PM",
  "3:00–5:00 PM": "3:00-5:00 PM",
}

const formSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(40),
  service: z.enum(serviceValues),
  wantsMobileService: z.boolean().optional().default(false),
  preferredDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime: z.preprocess(
    (value) => (typeof value === "string" ? legacyTimeSlotMap[value] || value : value),
    z.enum(timeSlots),
  ),
  message: z.string().trim().min(5).max(2000),
  estimate: z.union([z.string(), z.number()]).optional(),
  estimateRange: z.string().trim().max(40).optional(),
  mobileFee: z.number().min(0).max(500).optional(),
  language: z.enum(["en", "vi"]).optional().default("en"),
  website: z.string().max(200).optional().default(""),
})

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  APPOINTMENTS_FROM_EMAIL: z.string().min(3),
  APPOINTMENTS_TO_EMAIL: z.string().email(),
  APPOINTMENTS_BCC_EMAIL: z.string().email().optional().or(z.literal("")),
  APPOINTMENTS_BUSINESS_NAME: z.string().min(1).default("DQ Automotive"),
})

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const MAX_TRACKED_IPS = 1000
const requestLog = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const windowStart = now - WINDOW_MS

  if (requestLog.size > MAX_TRACKED_IPS) {
    for (const [key, times] of requestLog.entries()) {
      const recent = times.filter((time) => time > windowStart)
      if (recent.length === 0) requestLog.delete(key)
      else requestLog.set(key, recent)
    }
  }

  const recent = (requestLog.get(ip) || []).filter((time) => time > windowStart)
  recent.push(now)
  requestLog.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

export async function POST(req: Request) {
  const ip = getClientIp(req)

  try {
    const contentLength = Number(req.headers.get("content-length") || 0)
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, message: "Request too large" }, { status: 413 })
    }

    if (rateLimited(ip)) {
      return NextResponse.json({ ok: false, message: "Too many requests" }, { status: 429 })
    }

    const json = await req.json().catch(() => null)
    const parsed = formSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data

    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const env = envSchema.safeParse({
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      APPOINTMENTS_FROM_EMAIL: process.env.APPOINTMENTS_FROM_EMAIL || "",
      APPOINTMENTS_TO_EMAIL: process.env.APPOINTMENTS_TO_EMAIL || "",
      APPOINTMENTS_BCC_EMAIL: process.env.APPOINTMENTS_BCC_EMAIL || "",
      APPOINTMENTS_BUSINESS_NAME: process.env.APPOINTMENTS_BUSINESS_NAME || "DQ Automotive",
    })

    if (!env.success) {
      console.error("Appointment email env is not configured", env.error.flatten())
      return NextResponse.json(
        { ok: false, message: "Appointment email is not configured" },
        { status: 500 },
      )
    }

    const { RESEND_API_KEY, APPOINTMENTS_TO_EMAIL, APPOINTMENTS_BCC_EMAIL, APPOINTMENTS_BUSINESS_NAME } = env.data
    const from = formatFrom(env.data.APPOINTMENTS_FROM_EMAIL, APPOINTMENTS_BUSINESS_NAME)

    if (!from) {
      console.error("Invalid APPOINTMENTS_FROM_EMAIL")
      return NextResponse.json(
        { ok: false, message: "Appointment email is not configured" },
        { status: 500 },
      )
    }

    const service = services[data.service]
    const serviceLabel = service.label
    const estimateRange = service.priceRange
    const mobileFee = data.wantsMobileService ? MOBILE_SERVICE_FEE : 0
    const safeName = cleanForSubject(data.name)

    const subject = `New Appointment Request - ${serviceLabel} - ${safeName}`
    const html = buildOwnerHtml({
      business: APPOINTMENTS_BUSINESS_NAME,
      data,
      estimateRange,
      ip,
      mobileFee,
      serviceLabel,
    })
    const text = buildOwnerText({
      data,
      estimateRange,
      ip,
      mobileFee,
      serviceLabel,
    })

    const emailRes = await sendResendEmail(RESEND_API_KEY, {
      from,
      to: [APPOINTMENTS_TO_EMAIL],
      bcc: APPOINTMENTS_BCC_EMAIL ? [APPOINTMENTS_BCC_EMAIL] : undefined,
      subject,
      html,
      text,
      reply_to: data.email,
    })

    if (!emailRes.ok) {
      const providerError = await emailRes.text().catch(() => "")
      console.error("Resend owner email failed", providerError)
      return NextResponse.json({ ok: false, message: "Email failed" }, { status: 502 })
    }

    const autoReply = buildAutoReply({
      business: APPOINTMENTS_BUSINESS_NAME,
      data,
      estimateRange,
      mobileFee,
      serviceLabel,
    })

    await sendResendEmail(RESEND_API_KEY, {
      from,
      to: [data.email],
      subject: `We received your request - ${APPOINTMENTS_BUSINESS_NAME}`,
      html: autoReply.html,
      text: autoReply.text,
    }).catch((err) => console.error("Resend auto-reply failed", err))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Unexpected appointment error", err)
    return NextResponse.json({ ok: false, message: "Unexpected error" }, { status: 500 })
  }
}

function sendResendEmail(apiKey: string, payload: Record<string, unknown>) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}

function buildOwnerHtml({ business, data, estimateRange, ip, mobileFee, serviceLabel }: {
  business: string
  data: z.infer<typeof formSchema>
  estimateRange: string
  ip: string
  mobileFee: number
  serviceLabel: string
}) {
  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 8px 0">New Appointment Request</h2>
      <p style="margin:0 0 16px 0;color:#555">Submitted from ${escapeHtml(business)} website. IP: ${escapeHtml(ip)}</p>
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          ${tableRow("Name", data.name)}
          ${tableRow("Email", data.email)}
          ${tableRow("Phone", data.phone)}
          ${tableRow("Service", serviceLabel)}
          ${tableRow("Preferred date", data.preferredDate)}
          ${tableRow("Preferred time", data.preferredTime)}
          ${tableRow("Mobile service", data.wantsMobileService ? "Yes" : "No")}
          ${tableRow("Service estimate", estimateRange)}
          ${tableRow("Mobile fee", `$${mobileFee}`)}
          ${tableRow("Language", data.language)}
        </tbody>
      </table>
      <h3 style="margin:16px 0 8px 0">Message</h3>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>
  `
}

function buildOwnerText({ data, estimateRange, ip, mobileFee, serviceLabel }: {
  data: z.infer<typeof formSchema>
  estimateRange: string
  ip: string
  mobileFee: number
  serviceLabel: string
}) {
  return `New Appointment Request\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${serviceLabel}\nPreferred date: ${data.preferredDate}\nPreferred time: ${data.preferredTime}\nMobile service: ${data.wantsMobileService ? "Yes" : "No"}\nService estimate: ${estimateRange}\nMobile fee: $${mobileFee}\nLanguage: ${data.language}\n\nMessage:\n${data.message}\n\nIP: ${ip}`
}

function buildAutoReply({ business, data, estimateRange, mobileFee, serviceLabel }: {
  business: string
  data: z.infer<typeof formSchema>
  estimateRange: string
  mobileFee: number
  serviceLabel: string
}) {
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 8px 0">Thanks, ${escapeHtml(data.name)}!</h2>
      <p style="margin:0 0 12px 0">We received your appointment request for <strong>${escapeHtml(serviceLabel)}</strong>.</p>
      <p style="margin:0 0 12px 0">Requested time: <strong>${escapeHtml(data.preferredDate)}</strong>, <strong>${escapeHtml(data.preferredTime)}</strong>.</p>
      <p style="margin:0 0 12px 0">We will review it and reach out to confirm your appointment. If this is urgent, call us at <a href="tel:+12069229753">(206) 922-9753</a>.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
      <p style="margin:0 0 8px 0;color:#555">Summary:</p>
      <ul style="margin:0;padding-left:18px;color:#333">
        <li><strong>Service:</strong> ${escapeHtml(serviceLabel)}</li>
        <li><strong>Estimated range:</strong> ${escapeHtml(estimateRange)}</li>
        <li><strong>Mobile service:</strong> ${data.wantsMobileService ? `Yes, +$${mobileFee}` : "No"}</li>
      </ul>
      <p style="margin:16px 0 0 0;color:#555">Final pricing depends on the vehicle and inspection.</p>
      <p style="margin:16px 0 0 0;color:#555">${escapeHtml(business)}</p>
    </div>
  `

  const text = `Thanks, ${data.name}!\n\nWe received your appointment request for ${serviceLabel}.\nRequested time: ${data.preferredDate}, ${data.preferredTime}.\nEstimated range: ${estimateRange}\nMobile service: ${data.wantsMobileService ? `Yes, +$${mobileFee}` : "No"}\n\nWe will review it and contact you to confirm. If urgent, call (206) 922-9753.\n\n${business}`

  return { html, text }
}

function tableRow(label: string, value: string) {
  return `<tr><td style="padding:6px 0;width:160px;color:#555">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function formatFrom(fromRaw: string, business: string) {
  const raw = fromRaw.trim()
  if (/^[^<>]+<[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+>\s*$/.test(raw)) return raw

  const match = raw.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)
  if (match) return `${business} <${match[0]}>`

  return null
}

function cleanForSubject(input: string) {
  return input.replace(/[\r\n]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80)
}

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for")
  const realIp = req.headers.get("x-real-ip")
  return (forwardedFor?.split(",")[0]?.trim() || realIp || "unknown").slice(0, 80)
}
