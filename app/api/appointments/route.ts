import { NextResponse } from "next/server"

const requiredFields = ["name", "email", "phone", "vehicle", "location"]

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const missingField = requiredFields.find((field) => !body[field])
    if (missingField) {
      return NextResponse.json({ ok: false, message: `Missing field: ${missingField}` }, { status: 400 })
    }

    const payload = {
      source: "dqautomotive.com",
      submittedAt: new Date().toISOString(),
      ...body,
    }

    const webhookUrl = process.env.APPOINTMENT_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Appointment submission failed", error)
    return NextResponse.json({ ok: false, message: "Unable to submit request" }, { status: 500 })
  }
}
