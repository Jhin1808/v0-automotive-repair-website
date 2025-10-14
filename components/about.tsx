"use client"

import { useLanguage } from "@/lib/language-context"

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("about.title")}</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{t("about.description1")}</p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{t("about.description2")}</p>
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">{t("about.serviceAreas")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">$35</div>
                <div className="text-sm text-muted-foreground">{t("about.mobileFee")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">{t("about.experience")}</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img
              src="/professional-auto-mechanic-working-on-car-engine.jpg"
              alt="Our team at work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
