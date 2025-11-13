// components/footer.tsx
export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} DQ Automotive. Mobile mechanic service in Seattle,
          Burien & Kent.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:+12069229753"
            className="font-semibold text-slate-700 hover:text-orange-600"
          >
            Call: (206) 922-9753
          </a>
          <a
            href="#contact"
            className="text-xs font-medium uppercase tracking-wide text-slate-500 hover:text-orange-600"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </footer>
  )
}
