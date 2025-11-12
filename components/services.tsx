"use client"

import { BadgeCheck, Bolt, Disc, Gauge, SteeringWheel, Wrench } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

const serviceIcons = {
  preventive: Gauge,
  brakes: Disc,
  engine: Bolt,
  electrical: BadgeCheck,
  suspension: SteeringWheel,
  specialty: Wrench,
}

export function Services() {
  const { t } = useLanguage()

  const services = t<Array<{
    id: keyof typeof serviceIcons
    title: string
    description: string
    highlights: string[]
  }>>("services.groups")

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("services.eyebrow")}</p>
          <h2 className="mt-3 text-4xl font-semibold text-white lg:text-5xl">{t("services.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("services.subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcons[service.id]
            return (
              <Card key={service.id} className="glass-panel h-full rounded-[28px] border-border/60 bg-card/70 p-1">
                <CardContent className="space-y-6 p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {service.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
