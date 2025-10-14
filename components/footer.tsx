"use client"

import { Wrench } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-5 w-5 text-primary" />
              <span className="font-bold">DQ Automotive</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  {t("footer.services")}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t("footer.contactInfo")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>(206) 922-9753</li>
              <li>
                <a href="mailto:service@dqautomotive.net" className="hover:underline">service@dqautomotive.net</a>
              </li>
              <li>10525 16th Ave S</li>
              <li>Seattle, WA 98168</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} DQ Automotive. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
