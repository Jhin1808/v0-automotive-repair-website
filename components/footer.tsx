"use client"

import { Wrench } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative border-t border-white/10 bg-[#070708] py-12">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-primary/40 to-transparent" aria-hidden="true" />
      <div className="container mx-auto px-4">
        <div className="mb-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center bg-primary">
                <Wrench className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <span className="font-black uppercase tracking-[0.08em] text-white">DQ Automotive</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.16em] text-white">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <a href="#services" className="transition-colors hover:text-primary">{t("footer.services")}</a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-primary">{t("footer.about")}</a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-primary">{t("footer.contact")}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.16em] text-white">{t("footer.contactInfo")}</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><a href="tel:+12069229753" className="transition-colors hover:text-primary">(206) 922-9753</a></li>
              <li><a href="mailto:quang.nguyen@dqautomotivellc.com" className="break-all transition-colors hover:text-primary">quang.nguyen@dqautomotivellc.com</a></li>
              <li>10525 16th Ave S</li>
              <li>Seattle, WA 98168</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-7 text-xs uppercase tracking-wide text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} DQ Automotive. {t("footer.rights")}</p>
          <p>Mobile auto repair in Seattle, Burien &amp; Kent</p>
        </div>
      </div>
    </footer>
  )
}
