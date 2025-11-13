// components/about.tsx
export function About() {
  return (
    <section className="bg-slate-900 py-16 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
              About DQ Automotive
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Independent mobile mechanic focused on honest, transparent service.
            </h2>
            <p className="mt-4 text-sm text-slate-200 sm:text-base">
              DQ Automotive was built for people who don&apos;t have time to sit at a
              shop all day. We bring professional-grade tools and experience directly to
              you, explain every recommendation, and never upsell work you don&apos;t
              need.
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Whether it&apos;s a noisy brake, a battery that won&apos;t hold charge,
              or a check-engine light that won&apos;t go away, you get clear diagnostics,
              fair pricing, and work that&apos;s actually done right.
            </p>
          </div>

          <div className="space-y-4 rounded-3xl bg-slate-800/70 p-6">
            <h3 className="text-sm font-semibold text-slate-100">
              Why drivers choose mobile service
            </h3>
            <ul className="space-y-3 text-sm text-slate-200">
              <li>• No towing or ride-sharing to a shop</li>
              <li>• Evening and weekend availability</li>
              <li>• See the work being done on your own driveway</li>
              <li>• Clear explanation of parts, labor, and options</li>
            </ul>
            <p className="pt-2 text-xs text-slate-400">
              Ask about bilingual support (English / Vietnamese) when you book.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
