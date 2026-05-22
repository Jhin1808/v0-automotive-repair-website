import { CheckCircle2, MapPin, Phone, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900 py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-blue-500 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/40 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-200">
            <MapPin className="h-3.5 w-3.5" />
            Mobile mechanic in Seattle, Burien, and Kent
          </p>

          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Auto repair that comes to your driveway.
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
              Skip the tow truck and waiting room. DQ Automotive brings diagnostics, maintenance, and common repairs directly to your home or workplace.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600"
            >
              Book Mobile Service
            </a>

            <a
              href="tel:+12069229753"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call (206) 922-9753
            </a>
          </div>

          <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <CheckCircle2 className="h-4 w-4 text-orange-300" />
              Same-day requests
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <ShieldCheck className="h-4 w-4 text-orange-300" />
              Clear estimates
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <MapPin className="h-4 w-4 text-orange-300" />
              We come to you
            </div>
          </div>
        </div>

        <div className="lg:flex-1">
          <div className="mx-auto max-w-md rounded-3xl bg-white p-6 text-slate-950 shadow-2xl ring-1 ring-white/20">
            <div className="mb-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                Quick estimate
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">
                Common mobile service ranges
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Select a service below in the booking form and we will confirm the final quote after reviewing your vehicle details.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              {[
                ["Oil Change", "$80-$120"],
                ["Brake Service", "$250-$600"],
                ["Battery Replacement", "$180-$350"],
                ["Diagnostic Scan", "$80-$140"],
              ].map(([name, price]) => (
                <div key={name} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <span className="font-medium text-slate-800">{name}</span>
                  <span className="font-bold text-orange-600">{price}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">
              <p className="text-sm font-semibold text-slate-950">Mobile service starts at $35</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Final pricing depends on vehicle make, model, issue, parts, and location.
              </p>
            </div>

            <a
              href="#contact"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Request Appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
