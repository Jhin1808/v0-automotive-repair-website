"use client"

import { ClipboardCheck, Clock, DollarSign, ShieldCheck } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

const icons = [ShieldCheck, Clock, ClipboardCheck, DollarSign]

export function WhyChooseUs() {
  const { t } = useLanguage()
  const features = t<Array<{ title: string; description: string }>>("whyChoose.features")
  const cards = t<Array<{ label: string; value: string; description: string }>>("whyChoose.cards")

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="rounded-[32px] border border-border/40 bg-gradient-to-br from-white/5 via-card/70 to-background/60 p-1">
          <div className="grid gap-10 rounded-[28px] bg-background/60 p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("whyChoose.eyebrow")}</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">{t("whyChoose.title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("whyChoose.subtitle")}</p>
              <div className="mt-10 grid gap-6">
                {features.map((feature, index) => {
                  const Icon = icons[index]
                  return (
                    <div key={feature.title} className="flex items-start gap-4">
                      <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-white">{feature.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {cards.map((card) => (
                <Card key={card.label} className="h-full rounded-2xl border-border/40 bg-card/80">
                  <CardContent className="space-y-2 p-6">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground">{card.label}</p>
                    <p className="text-3xl font-semibold text-white">{card.value}</p>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
