"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Languages, PhoneCall, ShieldCheck, Wrench } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { language, setLanguage, t } = useLanguage()

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetId = event.currentTarget.getAttribute("href")?.replace("#", "")
    if (!targetId) return

    event.preventDefault()
    const target = document.getElementById(targetId)
    target?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const navigation = [
    { id: "services", label: t("nav.services") },
    { id: "about", label: t("nav.about") },
    { id: "process", label: t("nav.process") },
    { id: "reviews", label: t("nav.reviews") },
    { id: "contact", label: t("nav.contact") },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="border-b border-border/40 bg-gradient-to-r from-primary/15 via-transparent to-transparent">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs text-muted-foreground sm:text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>{t("nav.responseTime")}</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <PhoneCall className="h-4 w-4 text-primary" />
            <a href="tel:+12069229753" className="hover:text-primary">
              (206) 922-9753
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-semibold leading-tight">DQ Automotive</p>
              <p className="text-sm text-muted-foreground">{t("nav.subtitle")}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={scrollToSection}
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setLanguage(language === "en" ? "vi" : "en")}
              className="gap-2 border-border/60 bg-background/60 text-foreground"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">{language === "en" ? "VI" : "EN"}</span>
            </Button>
            <Button size="sm" className="hidden gap-2 text-sm font-semibold sm:flex" asChild>
              <a href="#contact" onClick={scrollToSection}>
                {t("nav.bookAppointment")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
