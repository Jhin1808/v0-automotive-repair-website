import { CalendarCheck, ClipboardList, PhoneCall, Wrench } from "lucide-react"

const steps = [
  {
    title: "Tell us what is wrong",
    description: "Choose the service, add your vehicle issue, and share the best date and time window.",
    icon: ClipboardList,
  },
  {
    title: "We review the request",
    description: "DQ Automotive checks the details and contacts you to confirm availability and next steps.",
    icon: PhoneCall,
  },
  {
    title: "Get a clear estimate",
    description: "You receive a realistic starting range before work begins, with final pricing confirmed after inspection.",
    icon: CalendarCheck,
  },
  {
    title: "Mobile mechanic arrives",
    description: "Service is completed at your home, workplace, or another safe and legal location.",
    icon: Wrench,
  },
]

export function BookingSteps() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
              Easy booking process
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Book mobile auto service in a few clear steps
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Customers should not have to guess what happens after submitting a form. This process sets clear expectations before they book.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            Start Booking
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article
                key={step.title}
                className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
