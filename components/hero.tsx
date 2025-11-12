"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowUpRight, CalendarDays, Phone, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()
  const metrics = t<Array<{ label: string; value: string }>>("hero.metrics")
  const highlights = t<string[]>("hero.card.highlights")

  const scrollToContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="relative isolate overflow-hidden pt-40 pb-24" id="home">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              {t("hero.badge")}
            </div>
            <div>
              <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">{t("hero.description")}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-border/60 bg-card/60 p-4">
                  <p className="text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 text-base font-semibold" asChild>
                <a href="#contact" onClick={scrollToContact}>
                  <CalendarDays className="h-5 w-5" />
                  {t("hero.primaryCta")}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
                <a href="tel:+12069229753">
                  <Phone className="h-5 w-5" />
                  {t("hero.secondaryCta")} · (206) 922-9753
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-xs uppercase tracking-wide text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                {t("hero.badges.warranty")}
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                {t("hero.badges.response")}
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-primary" />
                {t("hero.badges.fleet")}
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl border border-border/60 bg-gradient-to-b from-white/5 to-white/0 p-1">
            <div className="glass-panel rounded-[28px] p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("hero.card.tag")}</p>
                  <p className="text-2xl font-semibold text-white">{t("hero.card.title")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t("hero.card.description")}</p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("hero.card.availabilityLabel")}</p>
                      <p className="text-lg font-semibold text-white">{t("hero.card.availabilityValue")}</p>
                    </div>
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {t("hero.card.turnaround")}
                    </span>
                  </div>
                  <hr className="my-4 border-border/40" />
                  <div className="space-y-3 text-sm text-muted-foreground">
                    {highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary/70" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full gap-2" asChild>
                  <a href="#contact" onClick={scrollToContact}>
                    {t("hero.card.cta")}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>

                <p className="text-xs text-muted-foreground">{t("hero.card.disclaimer")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
