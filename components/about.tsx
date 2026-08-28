"use client"

import { useLanguage } from "@/lib/language-context"

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative overflow-hidden bg-[#0e0e10] py-20 md:py-32">
      <div className="garage-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3" aria-hidden="true">
              <span className="h-1 w-14 bg-primary" />
              <span className="h-1 w-4 bg-primary/40" />
            </div>
            <h2 className="mb-7 text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-6xl">
              {t("about.title")}
            </h2>
            <p className="mb-5 text-lg leading-relaxed text-zinc-400">{t("about.description1")}</p>
            <p className="mb-8 text-lg leading-relaxed text-zinc-400">{t("about.description2")}</p>

            <div className="grid grid-cols-3 border-y border-white/10">
              <div className="py-6 pr-3">
                <div className="mb-1 text-3xl font-black text-primary md:text-4xl">3</div>
                <div className="text-xs font-bold uppercase tracking-wide text-zinc-500">{t("about.serviceAreas")}</div>
              </div>
              <div className="border-x border-white/10 px-4 py-6">
                <div className="mb-1 text-3xl font-black text-primary md:text-4xl">$35</div>
                <div className="text-xs font-bold uppercase tracking-wide text-zinc-500">{t("about.mobileFee")}</div>
              </div>
              <div className="py-6 pl-4">
                <div className="mb-1 text-3xl font-black text-primary md:text-4xl">{t("about.experience")}</div>
                <div className="text-xs font-bold uppercase tracking-wide text-zinc-500">Experience</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-primary" aria-hidden="true" />
            <div className="absolute -right-4 -top-4 h-24 w-24 border-r-2 border-t-2 border-primary" aria-hidden="true" />
            <div className="relative h-[430px] overflow-hidden border border-white/10 md:h-[560px]">
              <img
                src="/professional-auto-mechanic-working-on-car-engine.jpg"
                alt="DQ Automotive mechanic working on a car engine"
                className="h-full w-full object-cover grayscale-[20%] transition duration-700 hover:scale-[1.02] hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,9,10,0.82)_0%,transparent_45%)]" />
              <div className="absolute bottom-0 left-0 border-l-4 border-primary bg-black/80 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                DQ Automotive
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
