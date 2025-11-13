import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "DQ Automotive | Mobile Mechanic",
  description: "Mobile auto repair & diagnostics serving Seattle, Burien, and Kent.",
  icons: {
    icon: "/favicon.png",       // or "/dq-logo.png" if you used that name
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}


