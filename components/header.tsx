"use client"

import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#service-areas", label: "Service Areas" },
    { href: "#contact", label: "Book" },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur shadow-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-950 text-sm font-black text-white shadow-sm">
            DQ
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-slate-950">
              DQ Automotive
            </span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              Mobile Mechanic
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-orange-600"
            >
              {item.label}
            </a>
          ))}

          <a
            href="tel:+12069229753"
            className="text-sm font-semibold text-slate-900 hover:text-orange-600"
          >
            (206) 922-9753
          </a>

          <a
            href="#contact"
            className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-lg"
          >
            Book Service
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-950 md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Open main menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-orange-600"
              >
                {item.label}
              </a>
            ))}

            <a
              href="tel:+12069229753"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 hover:text-orange-600"
            >
              Call (206) 922-9753
            </a>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-orange-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-md hover:bg-orange-600"
            >
              Book Service
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
