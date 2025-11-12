"use client"

import { MapPin, Navigation } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function ServiceAreas() {
  const { t } = useLanguage()
  const areas = t<Array<{ city: string; description: string; response: string }>>("serviceAreas.list")

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("serviceAreas.eyebrow")}</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{t("serviceAreas.title")}</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("serviceAreas.subtitle")}</p>
          </div>
          <div className="rounded-full border border-border/40 px-5 py-3 text-sm text-muted-foreground">
            {t("serviceAreas.disclaimer")}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {areas.map((area) => (
            <Card key={area.city} className="border-border/40 bg-card/70">
              <CardContent className="space-y-4 p-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-white">{area.city}</p>
                    <p className="text-sm text-muted-foreground">{area.response}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border/40 bg-card/70 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/15 p-3 text-primary">
                <Navigation className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">{t("serviceAreas.feeLabel")}</p>
                <p className="text-xl font-semibold text-white">{t("serviceAreas.feeValue")}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground md:max-w-xl">{t("serviceAreas.feeDescription")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
