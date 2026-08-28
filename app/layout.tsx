import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL("https://dqautomotive.net"),
  title: {
    default: "DQ Automotive | Mobile Auto Repair in Seattle",
    template: "%s | DQ Automotive",
  },
  description:
    "Mobile automotive repair in Seattle, Burien, and Kent. DQ Automotive provides diagnostics, maintenance, and repairs at your location.",
  applicationName: "DQ Automotive",
  keywords: [
    "mobile auto repair",
    "Seattle mechanic",
    "Burien auto repair",
    "Kent auto repair",
    "DQ Automotive",
  ],
  creator: "DQ Automotive",
  publisher: "DQ Automotive",
  category: "automotive",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dqautomotive.net",
    siteName: "DQ Automotive",
    title: "DQ Automotive | Mobile Auto Repair in Seattle",
    description:
      "Professional mobile automotive diagnostics, maintenance, and repairs throughout Seattle, Burien, and Kent.",
  },
  twitter: {
    card: "summary",
    title: "DQ Automotive | Mobile Auto Repair in Seattle",
    description:
      "Professional mobile automotive diagnostics, maintenance, and repairs throughout Seattle, Burien, and Kent.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>{children}</LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
