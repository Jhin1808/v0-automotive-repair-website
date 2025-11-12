// components/hero.tsx
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 py-20 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-blue-500 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        {/* Left: content */}
        <div className="max-w-xl space-y-6">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300">
            Mobile mechanic • Seattle · Burien · Kent
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="block">Professional Mobile</span>
            <span className="block text-orange-400">Auto Repair That Comes to You</span>
          </h1>

          <p className="text-base text-slate-200 sm:text-lg">
            No towing, no waiting rooms. DQ Automotive brings full–service diagnostics,
            repairs, and maintenance directly to your driveway or workplace.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600"
            >
              Book Mobile Service
            </a>

            <a
              href="tel:+12069229753"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              Call: (206) 922-9753
            </a>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-4">
              <dt className="text-slate-200">Same-Day Availability</dt>
              <dd className="mt-1 text-2xl font-bold text-white">7 days</dd>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <dt className="text-slate-200">Service Area</dt>
              <dd className="mt-1 text-2xl font-bold text-white">Seattle+</dd>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <dt className="text-slate-200">Customer Rating</dt>
              <dd className="mt-1 text-2xl font-bold text-orange-300">5.0★</dd>
            </div>
          </dl>
        </div>

        {/* Right: floating card / estimate */}
        <div className="lg:flex-1">
          <div className="mx-auto max-w-md rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">
              Quick Service Estimate
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Typical price ranges for common mobile services.
            </p>

            <div className="mt-4 space-y-3 text-sm">
              {[
                ["Oil Change", "$80–$120"],
                ["Brake Service", "$250–$600"],
                ["Battery Replacement", "$180–$350"],
                ["Diagnostic Scan", "$80–$140"],
              ].map(([name, price]) => (
                <div
                  key={name}
                  className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-medium text-slate-800">{name}</span>
                  <span className="font-semibold text-orange-500">{price}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Final pricing depends on vehicle make/model and exact issue. Get a personalized quote in minutes.
            </p>

            <a
              href="#contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Request Exact Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
