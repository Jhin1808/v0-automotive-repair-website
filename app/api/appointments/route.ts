import { NextResponse } from "next/server"
import { z } from "zod"

// Keep Node runtime (Resend SDK is not edge-compatible)
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const formSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(40),
  service: z.string().min(1, "service required"),
  wantsMobileService: z.boolean().optional().default(false),
  message: z.string().min(5).max(4000),
  estimate: z.number().optional().default(0),
  language: z.string().optional().default("en"),
  // Honeypot field — should be empty
  website: z.string().optional().default(""),
})

// Very light in-memory rate-limit (best-effort only)
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const requestLog = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const windowStart = now - WINDOW_MS
  const arr = requestLog.get(ip) || []
  const recent = arr.filter((t) => t > windowStart)
  recent.push(now)
  requestLog.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || "unknown"

  try {
    if (rateLimited(ip)) {
      return NextResponse.json({ ok: false, message: "Too many requests" }, { status: 429 })
    }

    const json = await req.json().catch(() => null)
    const parsed = formSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data

    // Honeypot trip
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const FROM_RAW = process.env.APPOINTMENTS_FROM_EMAIL || "" // e.g. appointments@yourdomain.com or "Name <email@domain>"
    const TO_RAW = process.env.APPOINTMENTS_TO_EMAIL || ""
    const BCC_RAW = process.env.APPOINTMENTS_BCC_EMAIL || ""
    const BUSINESS = process.env.APPOINTMENTS_BUSINESS_NAME || "DQ Automotive"

    if (!RESEND_API_KEY || !FROM_RAW || !TO_RAW) {
      return NextResponse.json(
        { ok: false, message: "Server not configured. Missing env." },
        { status: 500 },
      )
    }

    const FROM = formatFrom(FROM_RAW, BUSINESS)
    if (!FROM) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Invalid APPOINTMENTS_FROM_EMAIL. Use email@example.com or 'Name <email@example.com>'.",
        },
        { status: 400 },
      )
    }
    const TO = normalizeEmail(TO_RAW)
    const BCC = BCC_RAW ? normalizeEmail(BCC_RAW) : ""

    const subject = `New Appointment Request — ${data.service || "General"} — ${data.name}`
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 8px 0">New Appointment Request</h2>
        <p style="margin:0 0 16px 0;color:#555">Submitted from website. IP: ${ip}</p>
        <table style="width:100%;border-collapse:collapse">
          <tbody>
            <tr><td style="padding:6px 0;width:160px;color:#555">Name</td><td style="padding:6px 0">${escapeHtml(
              data.name,
            )}</td></tr>
            <tr><td style="padding:6px 0;color:#555">Email</td><td style="padding:6px 0">${escapeHtml(
              data.email,
            )}</td></tr>
            <tr><td style="padding:6px 0;color:#555">Phone</td><td style="padding:6px 0">${escapeHtml(
              data.phone,
            )}</td></tr>
            <tr><td style="padding:6px 0;color:#555">Service</td><td style="padding:6px 0">${escapeHtml(
              data.service || "General",
            )}</td></tr>
            <tr><td style="padding:6px 0;color:#555">Mobile service</td><td style="padding:6px 0">${
              data.wantsMobileService ? "Yes" : "No"
            }</td></tr>
            <tr><td style="padding:6px 0;color:#555">Estimate (client)</td><td style="padding:6px 0">$${Number(
              data.estimate || 0,
            ).toFixed(2)}+</td></tr>
            <tr><td style="padding:6px 0;color:#555">Language</td><td style="padding:6px 0">${escapeHtml(
              data.language,
            )}</td></tr>
          </tbody>
        </table>
        ${data.message ? `<h3 style="margin:16px 0 8px 0">Message</h3><p>${escapeHtml(data.message)}</p>` : ""}
      </div>
    `
    const text = `New Appointment Request\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${
      data.service || "General"
    }\nMobile service: ${data.wantsMobileService ? "Yes" : "No"}\nEstimate: $${Number(
      data.estimate || 0,
    ).toFixed(2)}+\nLanguage: ${data.language}\n\nMessage:\n${data.message || "(none)"}\n\nIP: ${ip}`

    // Send owner notification
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        bcc: BCC ? [BCC] : undefined,
        subject,
        html,
        text,
        reply_to: (data.email || "").trim(),
      }),
    })

    if (!emailRes.ok) {
      const errJson = await emailRes.json().catch(() => null)
      return NextResponse.json({ ok: false, message: "Email failed", err: errJson }, { status: 502 })
    }

    // Send customer auto-reply (best effort)
    const arSubject = `We received your request — ${BUSINESS}`
    const arHtml = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 8px 0">Thanks, ${escapeHtml(data.name)}!</h2>
        <p style="margin:0 0 12px 0">We received your appointment request for <strong>${escapeHtml(
          data.service || "General",
        )}</strong>. We'll review it and reach out to confirm your time.</p>
        <p style="margin:0 0 12px 0">If this is urgent, call us at <a href="tel:+12069229753">(206) 922‑9753</a>.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <p style="margin:0 0 8px 0;color:#555">What you sent:</p>
        <ul style="margin:0;padding-left:18px;color:#333">
          <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(data.phone)}</li>
          <li><strong>Service:</strong> ${escapeHtml(data.service || "General")}</li>
          <li><strong>Mobile service:</strong> ${data.wantsMobileService ? "Yes" : "No"}</li>
        </ul>
        ${
          data.message
            ? `<p style="margin:12px 0 0 0;color:#555"><strong>Message:</strong><br/>${escapeHtml(data.message)}</p>`
            : ""
        }
        <p style="margin:16px 0 0 0;color:#555">— ${escapeHtml(BUSINESS)}</p>
      </div>
    `
    const arText = `Thanks, ${data.name}!\n\nWe received your appointment request for ${
      data.service || "General"
    }. We'll review it and contact you to confirm.\n\nIf urgent, call (206) 922-9753.\n\n— ${BUSINESS}`

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [(data.email || "").trim()],
        subject: arSubject,
        html: arHtml,
        text: arText,
      }),
    }).catch(() => null)

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, message: "Unexpected error" }, { status: 500 })
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function normalizeEmail(v: string) {
  return v.trim()
}

function formatFrom(fromRaw: string, business: string) {
  const raw = fromRaw.trim()
  // Already in Name <email@domain> format
  if (/<.*@.*>\s*$/.test(raw)) return raw
  // Extract first email in string
  const match = raw.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)
  if (match) {
    const email = match[0]
    return `${business} <${email}>`
  }
  return null
}
