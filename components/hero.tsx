"use client"

import { Button } from "@/components/ui/button"
import { Phone, Calendar, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const ARI_BOOKING_URL =
  "https://www.aribooking.utilitymobileapps.com/index.html?FBProject=ARI&shopID=lxZrYdjOImTXAMx0CtnT8XL8Dsw1"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/modern-automotive-repair-shop-interior-with-cars.jpg"
          alt="Auto repair shop"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">{t("hero.badge")}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">{t("hero.title")}</h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">{t("hero.description")}</p>

          <div className="flex items-center gap-2 mb-6 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{t("hero.serviceArea")}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base font-semibold" asChild>
              <a href={ARI_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                {t("hero.scheduleService")}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base font-semibold bg-transparent" asChild>
              <a href="tel:+12069229753">
                <Phone className="mr-2 h-5 w-5" />
                {t("hero.call")} (206) 922-9753
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
