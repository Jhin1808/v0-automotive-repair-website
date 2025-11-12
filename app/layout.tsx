import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"

export const metadata: Metadata = {
  title: "DQ Automotive | Mobile Auto Service for Seattle, Burien & Kent",
  description:
    "Book ASE-certified mobile automotive repair that comes to your driveway. Transparent communication, concierge service, and rapid response for Seattle, Burien, and Kent.",
  metadataBase: new URL("https://dqautomotive.com"),
  openGraph: {
    title: "DQ Automotive | Concierge Mobile Auto Repair",
    description:
      "Trusted mobile mechanic serving Seattle, Burien, and Kent with transparent booking and concierge service.",
    url: "https://dqautomotive.com",
    siteName: "DQ Automotive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dqautomotive",
    title: "DQ Automotive | Mobile Auto Service",
    description: "Concierge automotive repair that travels to you across Seattle, Burien, and Kent.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="bg-background text-foreground">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Preparing your experience…</div>}>
          <LanguageProvider>{children}</LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
