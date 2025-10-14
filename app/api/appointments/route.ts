import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

// Keep Node runtime (Resend SDK is not edge-compatible)
export const dynamic = "force-dynamic"

const formSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(40),
  service: z.string().optional().default(""),
  wantsMobileService: z.boolean().optional().default(false),
  message: z.string().max(4000).optional().default(""),
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
    const FROM = process.env.APPOINTMENTS_FROM_EMAIL // e.g. appointments@yourdomain.com (verified in Resend)
    const TO = process.env.APPOINTMENTS_TO_EMAIL // e.g. your personal inbox

    if (!RESEND_API_KEY || !FROM || !TO) {
      return NextResponse.json(
        { ok: false, message: "Server not configured. Missing env." },
        { status: 500 },
      )
    }

    const resend = new Resend(RESEND_API_KEY)

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

    const sendResult = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      html,
      text,
      reply_to: data.email,
      headers: {
        "X-Appointment-IP": ip,
        "X-Appointment-Service": data.service || "General",
      },
    })

    if ((sendResult as any)?.error) {
      return NextResponse.json({ ok: false, message: "Email failed" }, { status: 502 })
    }

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

