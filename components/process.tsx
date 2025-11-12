"use client"

import { CalendarCheck, ClipboardList, Keys, MessageSquare } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

const icons = [CalendarCheck, MessageSquare, ClipboardList, Keys]

export function Process() {
  const { t } = useLanguage()
  const steps = t<Array<{ title: string; description: string; detail: string }>>("process.steps")

  return (
    <section id="process" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("process.eyebrow")}</p>
          <h2 className="mt-3 text-4xl font-semibold text-white">{t("process.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("process.subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = icons[index]
            return (
              <Card key={step.title} className="border-border/40 bg-card/70">
                <CardContent className="space-y-4 p-8">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/15 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">0{index + 1}</p>
                      <p className="text-xl font-semibold text-white">{step.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <p className="text-sm text-white/70">{step.detail}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
