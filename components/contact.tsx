"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/language-context"
import { BadgeCheck, Calendar, Mail, MapPin, Phone, Send, Truck } from "lucide-react"

const BASE_MOBILE_FEE = 35

const serviceCatalog = [
  { value: "preventive", startingAt: 145, labelKey: "contact.services.preventive.label", descriptionKey: "contact.services.preventive.description" },
  { value: "brakes", startingAt: 220, labelKey: "contact.services.brakes.label", descriptionKey: "contact.services.brakes.description" },
  { value: "engine", startingAt: 480, labelKey: "contact.services.engine.label", descriptionKey: "contact.services.engine.description" },
  { value: "electrical", startingAt: 180, labelKey: "contact.services.electrical.label", descriptionKey: "contact.services.electrical.description" },
  { value: "suspension", startingAt: 260, labelKey: "contact.services.suspension.label", descriptionKey: "contact.services.suspension.description" },
  { value: "fleet", startingAt: 0, labelKey: "contact.services.fleet.label", descriptionKey: "contact.services.fleet.description" },
]

type Status = "idle" | "success" | "error"

export function Contact() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState("")
  const [wantsMobileService, setWantsMobileService] = useState(true)
  const [status, setStatus] = useState<Status>("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    location: "",
    preferredDate: "",
    notes: "",
  })

  const selected = serviceCatalog.find((service) => service.value === selectedService)
  const estimate =
    selected && selected.startingAt
      ? selected.startingAt + (wantsMobileService ? BASE_MOBILE_FEE : 0)
      : wantsMobileService
        ? BASE_MOBILE_FEE
        : 0

  const handleChange = (field: keyof typeof formValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          wantsMobileService,
          service: selectedService,
          estimate,
        }),
      })

      if (!response.ok) {
        throw new Error("Request failed")
      }

      setStatus("success")
      setFormValues({
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        location: "",
        preferredDate: "",
        notes: "",
      })
      setSelectedService("")
      setWantsMobileService(true)
    } catch (error) {
      console.error(error)
      setStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("contact.eyebrow")}</p>
          <h2 className="mt-3 text-4xl font-semibold text-white">{t("contact.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/40 bg-card/80">
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.form.name")}</Label>
                    <Input id="name" required value={formValues.name} onChange={handleChange("name")} placeholder="Taylor Jensen" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                    <Input id="phone" required type="tel" value={formValues.phone} onChange={handleChange("phone")} placeholder="(206) 555-0123" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.email")}</Label>
                    <Input id="email" required type="email" value={formValues.email} onChange={handleChange("email")} placeholder="you@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">{t("contact.form.preferredDate")}</Label>
                    <Input id="preferredDate" type="date" value={formValues.preferredDate} onChange={handleChange("preferredDate")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">{t("contact.form.vehicle")}</Label>
                  <Input id="vehicle" required value={formValues.vehicle} onChange={handleChange("vehicle")} placeholder="2021 Lexus RX 350" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{t("contact.form.location")}</Label>
                  <Input id="location" required value={formValues.location} onChange={handleChange("location")} placeholder="South Seattle, 98168" />
                </div>

                <div className="space-y-2">
                  <Label>{t("contact.form.service")}</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("contact.form.selectService")} />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCatalog.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {t(service.labelKey)} · {service.startingAt ? `$${service.startingAt}+` : t("contact.form.customQuote")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selected && (
                    <p className="text-xs text-muted-foreground">{t(selected.descriptionKey)}</p>
                  )}
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/60 p-4">
                  <Checkbox
                    id="mobile-service"
                    checked={wantsMobileService}
                    onCheckedChange={(checked) => setWantsMobileService(Boolean(checked))}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="mobile-service" className="font-medium text-white">
                      {t("contact.form.mobileService")}
                    </Label>
                    <p className="text-sm text-muted-foreground">{t("contact.form.mobileDescription")}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">{t("contact.form.notes")}</Label>
                  <Textarea
                    id="notes"
                    value={formValues.notes}
                    onChange={handleChange("notes")}
                    placeholder={t("contact.form.notesPlaceholder")}
                    rows={5}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button type="submit" className="gap-2" disabled={isSubmitting}>
                    <Send className="h-4 w-4" />
                    {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                  </Button>
                  {status === "success" && <p className="text-sm text-emerald-400">{t("contact.feedback.success")}</p>}
                  {status === "error" && <p className="text-sm text-red-400">{t("contact.feedback.error")}</p>}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/40 bg-card/80">
              <CardContent className="space-y-6 p-8">
                <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("contact.summary.title")}</p>
                <div className="grid gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-white">{t("contact.summary.phoneLabel")}</p>
                      <a href="tel:+12069229753" className="text-white/70">
                        (206) 922-9753
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-white">{t("contact.summary.emailLabel")}</p>
                      <a href="mailto:quang.nguyen@dqautomotivellc.com" className="text-white/70">
                        quang.nguyen@dqautomotivellc.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-white">{t("contact.summary.areaLabel")}</p>
                      <p>Seattle · Burien · Kent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-white">{t("contact.summary.hoursLabel")}</p>
                      <p>{t("contact.summary.hoursValue")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/80">
              <CardContent className="space-y-6 p-8">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">{t("contact.estimate.title")}</p>
                    <p className="text-3xl font-semibold text-white">
                      {estimate > 0 ? `$${estimate.toLocaleString()}` : t("contact.estimate.placeholder")}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{t("contact.estimate.description")}</p>
                <div className="rounded-2xl border border-border/40 bg-background/60 p-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between text-white">
                    <span>{t("contact.estimate.service")}</span>
                    <span>{selected ? `$${selected.startingAt}+` : t("contact.estimate.pending")}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-white">
                    <span>{t("contact.estimate.mobileFee")}</span>
                    <span>{wantsMobileService ? `$${BASE_MOBILE_FEE}` : "$0"}</span>
                  </div>
                  <hr className="my-3 border-border/40" />
                  <div className="flex items-center justify-between text-white">
                    <span>{t("contact.estimate.total")}</span>
                    <span className="text-xl font-semibold">
                      {estimate > 0 ? `$${estimate.toLocaleString()}` : t("contact.estimate.placeholder")}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{t("contact.estimate.disclaimer")}</p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/80">
              <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-primary">{t("contact.guarantee.eyebrow")}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{t("contact.guarantee.title")}</p>
                  <p className="text-sm text-muted-foreground">{t("contact.guarantee.description")}</p>
                </div>
                <div className="rounded-full bg-primary/15 px-5 py-2 text-sm font-semibold text-primary">
                  <BadgeCheck className="mr-2 inline h-4 w-4" />
                  {t("contact.guarantee.badge")}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
