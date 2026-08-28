"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Languages, Wrench } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const ARI_BOOKING_URL =
  "https://www.aribooking.utilitymobileapps.com/index.html?FBProject=ARI&shopID=lxZrYdjOImTXAMx0CtnT8XL8Dsw1"

export function Header() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080809]/95 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-primary" aria-hidden="true" />
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="group flex items-center gap-3" aria-label="DQ Automotive home">
            <span className="flex h-10 w-10 items-center justify-center bg-primary shadow-[0_0_24px_rgba(220,38,38,0.25)] transition-transform group-hover:-rotate-3">
              <Wrench className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <span className="leading-none">
              <span className="block text-base font-black uppercase tracking-[0.08em] text-white sm:text-lg">
                DQ Automotive
              </span>
              <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground lg:block">
                Mobile Auto Repair
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            <a href="#services" className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-primary">
              {t("nav.services")}
            </a>
            <a href="#about" className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-primary">
              {t("nav.about")}
            </a>
            <a href="#contact" className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-primary">
              {t("nav.contact")}
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setLanguage(language === "en" ? "vi" : "en")}
              className="h-10 gap-2 rounded-none border-white/15 bg-white/[0.03] px-3 text-xs font-bold uppercase hover:border-primary hover:bg-primary/10 hover:text-white"
              aria-label={language === "en" ? "Switch to Vietnamese" : "Switch to English"}
            >
              <Languages className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{language === "en" ? "VI" : "EN"}</span>
            </Button>

            <Button size="sm" className="h-10 rounded-none px-3 font-black uppercase tracking-wide shadow-[0_0_24px_rgba(220,38,38,0.2)] sm:px-4" asChild>
              <a href={ARI_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="h-4 w-4 sm:mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">{t("nav.bookAppointment")}</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
