// components/header.tsx
"use client"

import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#service-areas", label: "Service Areas" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-1">
          <span className="text-xl font-extrabold tracking-tight text-blue-900">
            DQ
          </span>
          <span className="text-xl font-extrabold tracking-tight text-orange-500">
            Automotive
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition hover:text-orange-500"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 md:hidden"
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

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-full bg-orange-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-md hover:bg-orange-600"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
