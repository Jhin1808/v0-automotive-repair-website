"use client"

import { useLanguage } from "@/lib/language-context"

export function About() {
  const { t } = useLanguage()
  const pillars = t<Array<{ title: string; description: string }>>("about.pillars")
  const stats = t<Array<{ label: string; value: string }>>("about.stats")

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("about.eyebrow")}</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">{t("about.title")}</h2>
            <p className="mt-6 text-lg text-muted-foreground">{t("about.description1")}</p>
            <p className="mt-4 text-lg text-muted-foreground">{t("about.description2")}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/40 bg-card/70 p-5">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-border/40 bg-card/70 p-1">
            <div className="rounded-[28px] bg-background/60 p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("about.pillarTitle")}</p>
              <div className="mt-6 space-y-6">
                {pillars.map((pillar, index) => (
                  <div key={pillar.title} className="border-l-2 border-primary/40 pl-6">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                      {t("about.pillarStep")} 0{index + 1}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">{pillar.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
