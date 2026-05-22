import { BatteryCharging, ClipboardCheck, Disc3, Gauge, Settings, Wrench } from "lucide-react"

const services = [
  {
    title: "Oil Changes & Fluids",
    desc: "Oil, filter, fluid checks, and quick maintenance at your location.",
    tag: "Maintenance",
    icon: Wrench,
  },
  {
    title: "Brake Service & Repair",
    desc: "Pads, rotors, calipers, and brake fluid service for safer stopping power.",
    tag: "Safety",
    icon: Disc3,
  },
  {
    title: "Battery & Electrical",
    desc: "Battery testing, replacement, alternators, starters, and electrical diagnostics.",
    tag: "Electrical",
    icon: BatteryCharging,
  },
  {
    title: "Suspension & Steering",
    desc: "Struts, shocks, control arms, and steering components for a smoother ride.",
    tag: "Ride quality",
    icon: Settings,
  },
  {
    title: "Check Engine Light",
    desc: "Scan tools and step-by-step diagnostics for warning lights and trouble codes.",
    tag: "Diagnostics",
    icon: Gauge,
  },
  {
    title: "Pre-Purchase Inspections",
    desc: "On-site inspection before you buy a used car to avoid expensive surprises.",
    tag: "Inspection",
    icon: ClipboardCheck,
  },
]

export function Services() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
              Services
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Mobile auto repair for common vehicle problems
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Start with the service that best matches your issue. If you are not sure, choose General Repair in the booking form and describe the symptoms.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
          >
            Request a quote
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.title}
                className="group flex min-h-[210px] flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:ring-orange-100"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-950 text-white shadow-sm transition group-hover:bg-orange-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                    {service.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{service.desc}</p>
                <a href="#contact" className="mt-4 text-sm font-semibold text-orange-600 hover:text-orange-700">
                  Book this service
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
