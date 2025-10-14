"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Gauge, Droplet, Disc, Zap, CheckCircle, Settings, Clock, Cog } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Droplet,
      titleKey: "services.oilChange.title",
      descriptionKey: "services.oilChange.description",
    },
    {
      icon: Disc,
      titleKey: "services.brakes.title",
      descriptionKey: "services.brakes.description",
    },
    {
      icon: Settings,
      titleKey: "services.suspension.title",
      descriptionKey: "services.suspension.description",
    },
    {
      icon: Gauge,
      titleKey: "services.tuneUp.title",
      descriptionKey: "services.tuneUp.description",
    },
    {
      icon: Zap,
      titleKey: "services.electrical.title",
      descriptionKey: "services.electrical.description",
    },
    {
      icon: Clock,
      titleKey: "services.timing.title",
      descriptionKey: "services.timing.description",
    },
    {
      icon: CheckCircle,
      titleKey: "services.inspection.title",
      descriptionKey: "services.inspection.description",
    },
    {
      icon: Cog,
      titleKey: "services.diagnostics.title",
      descriptionKey: "services.diagnostics.description",
    },
    {
      icon: Wrench,
      titleKey: "services.general.title",
      descriptionKey: "services.general.description",
    },
  ]

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("services.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("services.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="border-2 border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(service.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(service.descriptionKey)}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
