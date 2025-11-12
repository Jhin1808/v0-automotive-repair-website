// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DQ Automotive | Mobile Mechanic",
  description: "Mobile auto repair & diagnostics serving Seattle, Burien, and Kent.",
  icons: {
    icon: "/favicon.icon",       // or "/dq-logo.png" if you used that name
    shortcut: "/favicon.icon",
    apple: "/favicon.icon",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

