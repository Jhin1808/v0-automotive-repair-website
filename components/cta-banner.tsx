"use client"

import { ArrowUpRight, PhoneCall } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function CtaBanner() {
  const { t } = useLanguage()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[32px] border border-border/30 bg-gradient-to-r from-primary/20 via-primary/10 to-background p-10">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("cta.eyebrow")}</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">{t("cta.title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("cta.subtitle")}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Button size="lg" className="gap-2 text-base font-semibold" asChild>
                <a href="#contact">
                  {t("cta.primary")}
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
                <a href="tel:+12069229753">
                  <PhoneCall className="h-5 w-5" />
                  {t("cta.secondary")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
