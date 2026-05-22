export function Footer() {
  return (
    <footer className="bg-slate-950 py-10 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-sm font-black text-white">
                DQ
              </span>
              <div>
                <p className="font-extrabold text-white">DQ Automotive</p>
                <p className="text-xs text-slate-400">Mobile mechanic service</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Mobile auto repair, diagnostics, and maintenance serving Seattle, Burien, Kent, and nearby South King County areas.
            </p>
          </div>

          <div className="grid gap-6 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold text-white">Contact</p>
              <div className="mt-3 space-y-2 text-slate-400">
                <p>10525 16th Ave S, Seattle, WA 98168</p>
                <a href="tel:+12069229753" className="block hover:text-orange-400">
                  (206) 922-9753
                </a>
                <a href="mailto:service@dqautomotive.net" className="block hover:text-orange-400">
                  service@dqautomotive.net
                </a>
              </div>
            </div>

            <div>
              <p className="font-semibold text-white">Book service</p>
              <div className="mt-3 space-y-3">
                <p className="text-slate-400">Open 9 AM - 7 PM, 7 days a week.</p>
                <a
                  href="#contact"
                  className="inline-flex rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Request Appointment
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-slate-500">
          © {new Date().getFullYear()} DQ Automotive. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
