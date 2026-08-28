"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const ARI_BOOKING_URL =
  "https://www.aribooking.utilitymobileapps.com/index.html?FBProject=ARI&shopID=lxZrYdjOImTXAMx0CtnT8XL8Dsw1"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-[760px] items-center overflow-hidden border-b border-white/10 pb-20 pt-32 md:min-h-[820px] md:pb-28 md:pt-40">
      <div className="absolute inset-0 z-0">
        <img
          src="/modern-automotive-repair-shop-interior-with-cars.jpg"
          alt="DQ Automotive repair shop"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,8,0.98)_0%,rgba(7,7,8,0.92)_45%,rgba(7,7,8,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#09090a_0%,transparent_42%,rgba(9,9,10,0.3)_100%)]" />
        <div className="garage-grid absolute inset-0 opacity-50" />
      </div>

      <div className="absolute right-[-7rem] top-[18%] hidden h-72 w-72 rotate-45 border-[48px] border-primary/10 lg:block" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl border-l-2 border-primary pl-5 sm:pl-8">
          <div className="mb-6 inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-9 bg-primary" aria-hidden="true" />
            {t("hero.badge")}
          </div>

          <h1 className="mb-6 max-w-4xl text-balance text-5xl font-black uppercase leading-[0.92] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {t("hero.title")}
          </h1>

          <p className="mb-7 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            {t("hero.description")}
          </p>

          <div className="mb-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">
            <span className="flex h-9 w-9 items-center justify-center bg-primary/15">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            </span>
            <span>{t("hero.serviceArea")}</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-14 rounded-none px-7 text-sm font-black uppercase tracking-[0.08em] shadow-[0_12px_35px_rgba(220,38,38,0.28)] transition-transform hover:-translate-y-0.5" asChild>
              <a href={ARI_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                {t("hero.scheduleService")}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 rounded-none border-white/25 bg-black/30 px-7 text-sm font-black uppercase tracking-[0.08em] text-white backdrop-blur-sm hover:border-primary hover:bg-primary/10 hover:text-white" asChild>
              <a href="tel:+12069229753">
                <Phone className="mr-2 h-5 w-5 text-primary" aria-hidden="true" />
                {t("hero.call")} (206) 922-9753
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-primary" aria-hidden="true" />
    </section>
  )
}
