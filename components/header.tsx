"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Wrench, Languages } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { language, setLanguage, t } = useLanguage()

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DQ Automotive</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.services")}
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.about")}
            </a>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.contact")}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setLanguage(language === "en" ? "vi" : "en")}
              className="gap-2"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">{language === "en" ? "VI" : "EN"}</span>
            </Button>

            <Button size="sm" className="font-semibold" asChild>
              <a href="/booking">
                {t("nav.bookAppointment")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
