// components/contact.tsx
export function Contact() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              Schedule Service
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Book your mobile appointment in a few minutes.
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Tell us what&apos;s going on with your vehicle, where it&apos;s parked,
              and your preferred time. We&apos;ll confirm availability and send a
              follow-up with pricing.
            </p>

            <div className="mt-5 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">
                  Emergency / same-day?
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Call or text for urgent issues, breakdowns, or no-start situations.
                </p>
                <a
                  href="tel:+12069229753"
                  className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700"
                >
                  (206) 922-9753
                </a>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">
                  Service hours
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Flexible hours, including evenings and weekends, depending on weather
                  and daylight.
                </p>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-3xl bg-white p-6 shadow-md">
            {/* IMPORTANT: update `action` to match your existing API route */}
            <form
              method="POST"
              action="/api/booking"
              className="space-y-4 text-sm"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Preferred date / time
                  </label>
                  <input
                    name="preferredTime"
                    type="text"
                    placeholder="e.g. Sat afternoon, this weekend"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Vehicle (year / make / model)
                  </label>
                  <input
                    name="vehicle"
                    type="text"
                    placeholder="2015 Honda Civic"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Service location (address or area)
                  </label>
                  <input
                    name="location"
                    type="text"
                    placeholder="Seattle / Burien / Kent"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  What&apos;s going on with your vehicle?
                </label>
                <textarea
                  name="details"
                  rows={4}
                  placeholder="Describe any noises, warning lights, recent work, or issues."
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600"
              >
                Submit Request
              </button>

              <p className="mt-2 text-[0.7rem] text-slate-500">
                By submitting, you agree to be contacted by phone, text, or email about
                your appointment. No spam — ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
