import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message, wantsMobileService, totalEstimate } = body

    // Send email to business
    await resend.emails.send({
      from: process.env.APPOINTMENTS_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.APPOINTMENTS_TO_EMAIL || "delivered@resend.dev",
      subject: `New Appointment Request from ${name}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Mobile Service:</strong> ${wantsMobileService ? "Yes" : "No"}</p>
        <p><strong>Estimated Total:</strong> $${totalEstimate}+</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: process.env.APPOINTMENTS_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Appointment Request Received - DQ Automotive",
      html: `
        <h2>Thank you for your appointment request!</h2>
        <p>Hi ${name},</p>
        <p>We received your appointment request for ${service}.</p>
        <p><strong>Estimated Cost:</strong> $${totalEstimate}+ (may vary)</p>
        <p>We will contact you shortly at ${phone} to confirm the details and schedule your mobile service.</p>
        <p>Best regards,<br>DQ Automotive</p>
      `,
    })

    return Response.json({ success: true, message: "Appointment request sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    return Response.json({ error: "Failed to send appointment request" }, { status: 500 })
  }
}
