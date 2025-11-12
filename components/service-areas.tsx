// components/service-areas.tsx
export function ServiceAreas() {
  const areas = [
    {
      city: "Seattle",
      desc: "Downtown, Beacon Hill, Rainier Valley, West Seattle, and surrounding neighborhoods.",
      badge: "Primary",
    },
    {
      city: "Burien",
      desc: "Residential neighborhoods, apartments, and workplace parking lots.",
      badge: "Popular",
    },
    {
      city: "Kent",
      desc: "Southcenter, Kent, and nearby South King County locations.",
      badge: "Expanded",
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              Service Areas
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              We Come to You in Seattle, Burien & Kent
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Driveway, street parking, or workplace — as long as it’s safe and legal to
              work, we can service your vehicle on-site.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Unsure if you&apos;re in range? Send your address in the booking form and
            we&apos;ll confirm.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.city}
              className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/60 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{area.city}</h3>
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-orange-600">
                  {area.badge}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
