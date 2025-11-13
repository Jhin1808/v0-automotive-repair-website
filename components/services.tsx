// components/services.tsx
export function Services() {
  const services = [
    {
      title: "Oil Changes & Fluids",
      desc: "Full–service oil changes with filter, fluids, and safety inspection at your location.",
      tag: "Maintenance",
    },
    {
      title: "Brake Service & Repair",
      desc: "Pads, rotors, calipers, and brake fluid service to restore safe stopping power.",
      tag: "Safety",
    },
    {
      title: "Battery & Electrical",
      desc: "Battery testing & replacement, alternators, starters, and electrical diagnostics.",
      tag: "Diagnostics",
    },
    {
      title: "Suspension & Steering",
      desc: "Struts, shocks, control arms, and steering components for a smoother, safer ride.",
      tag: "Comfort",
    },
    {
      title: "Check Engine Light",
      desc: "Professional scan tools and step-by-step diagnostics for warning lights and codes.",
      tag: "Diagnostics",
    },
    {
      title: "Pre-Purchase Inspections",
      desc: "On-site inspection before you buy a used car — avoid expensive surprises.",
      tag: "Inspection",
    },
  ]

  return (
    <div className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
            Services
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Full-Service Mobile Auto Repair
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            From routine maintenance to advanced diagnostics, we handle most jobs on-site
            so you can skip the tow truck and waiting room.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                {service.tag}
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">
                {service.desc}
              </p>
              <span className="mt-3 text-xs font-semibold text-orange-500">
                Mobile service • By appointment
              </span>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
