"use client"

import { Wrench } from "lucide-react"

import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border/30 py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">DQ Automotive</p>
                <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{t("footer.description")}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                {t("footer.quickLinks")}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#services" className="hover:text-primary">
                    {t("footer.links.services")}
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-primary">
                    {t("footer.links.about")}
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-primary">
                    {t("footer.links.process")}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary">
                    {t("footer.links.contact")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                {t("footer.contactInfo")}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>(206) 922-9753</li>
                <li>quang.nguyen@dqautomotivellc.com</li>
                <li>Seattle • Burien • Kent</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/20 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} DQ Automotive · {t("footer.rights")}
        </div>
      </div>
    </footer>
  )
}
