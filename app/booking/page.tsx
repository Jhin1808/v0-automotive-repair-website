import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Appointment | DQ Automotive",
  description: "Book your automotive service appointment online.",
}

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL

export default function BookingPage() {
  return (
    <main className="pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Book an Appointment</h1>
          <p className="text-muted-foreground">
            Choose a service time that works for you.
          </p>
        </div>

        {bookingUrl ? (
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="relative" style={{ paddingTop: "65vh" }}>
              <iframe
                src={bookingUrl}
                title="Online Scheduling"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allow="payment *; clipboard-write *;"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-card p-8">
            <h2 className="text-xl font-semibold mb-2">Connect your scheduling link</h2>
            <p className="text-muted-foreground mb-4">
              Set the environment variable <code>NEXT_PUBLIC_BOOKING_URL</code> to your scheduling page URL
              from Calendly, Cal.com, Square Appointments, or another provider. Example:
            </p>
            <pre className="bg-muted rounded p-4 text-sm overflow-auto">
{`# .env.local
NEXT_PUBLIC_BOOKING_URL=https://calendly.com/your-account/auto-service`}
            </pre>
            <p className="text-muted-foreground mt-4">
              Once set and deployed, this page will embed your live booking calendar.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

