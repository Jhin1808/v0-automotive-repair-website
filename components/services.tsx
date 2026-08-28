"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Cog, Disc, Droplet, Gauge, Settings, Wrench, Zap } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Services() {
  const { t } = useLanguage()

  const services = [
    { icon: Droplet, titleKey: "services.oilChange.title", descriptionKey: "services.oilChange.description" },
    { icon: Disc, titleKey: "services.brakes.title", descriptionKey: "services.brakes.description" },
    { icon: Settings, titleKey: "services.suspension.title", descriptionKey: "services.suspension.description" },
    { icon: Gauge, titleKey: "services.tuneUp.title", descriptionKey: "services.tuneUp.description" },
    { icon: Zap, titleKey: "services.electrical.title", descriptionKey: "services.electrical.description" },
    { icon: Clock, titleKey: "services.timing.title", descriptionKey: "services.timing.description" },
    { icon: CheckCircle, titleKey: "services.inspection.title", descriptionKey: "services.inspection.description" },
    { icon: Cog, titleKey: "services.diagnostics.title", descriptionKey: "services.diagnostics.description" },
    { icon: Wrench, titleKey: "services.general.title", descriptionKey: "services.general.description" },
  ]

  return (
    <section id="services" className="relative overflow-hidden bg-[#09090a] py-20 md:py-32">
      <div className="garage-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        <div className="mb-14 grid gap-6 border-b border-white/10 pb-10 md:mb-16 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3" aria-hidden="true">
              <span className="h-1 w-12 bg-primary" />
              <span className="h-1 w-3 bg-primary/40" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-[-0.035em] text-white md:text-6xl">
              {t("services.title")}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-400 md:justify-self-end">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={service.titleKey}
                className="group relative min-h-64 overflow-hidden rounded-none border border-white/10 bg-[#121214] shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-[#161618]"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                <span className="absolute right-5 top-4 font-mono text-xs font-bold tracking-[0.15em] text-zinc-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CardContent className="p-7 md:p-8">
                  <div className="mb-7 flex h-13 w-13 items-center justify-center border border-primary/35 bg-primary/10 transition-colors group-hover:bg-primary">
                    <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-xl font-black uppercase tracking-[-0.01em] text-white">
                    {t(service.titleKey)}
                  </h3>
                  <p className="leading-relaxed text-zinc-400">{t(service.descriptionKey)}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
