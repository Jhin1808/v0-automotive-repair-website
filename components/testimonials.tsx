"use client"

import { Quote } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function Testimonials() {
  const { t } = useLanguage()
  const testimonials = t<Array<{
    name: string
    role: string
    content: string
  }>>("testimonials.items")

  return (
    <section id="reviews" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("testimonials.eyebrow")}</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{t("testimonials.title")}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("testimonials.subtitle")}</p>
          </div>
          <div className="rounded-full border border-border/40 px-6 py-3 text-sm text-muted-foreground">
            {t("testimonials.summary")}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="h-full border-border/40 bg-card/80">
              <CardContent className="flex h-full flex-col gap-6 p-8">
                <Quote className="h-10 w-10 text-primary" />
                <p className="flex-1 text-lg text-white">{testimonial.content}</p>
                <div>
                  <p className="text-base font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
