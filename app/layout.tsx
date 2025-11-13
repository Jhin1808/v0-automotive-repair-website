import type { Metadata } from "next"
import "../styles/globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "DQ Automotive | Mobile Mechanic",
  description: "Mobile auto repair & diagnostics serving Seattle, Burien, and Kent.",
  icons: {
    icon: "/favicon.png",          // or another file in /public
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
