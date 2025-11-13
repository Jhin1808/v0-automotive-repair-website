"use client"

import { FormEvent, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/language-context"

const services = [
  { value: "oil-change", labelEn: "Oil Change", labelVi: "Thay Dầu", price: 55 },
  { value: "brake-service", labelEn: "Brake Service", labelVi: "Dịch Vụ Phanh", price: 175 },
  { value: "suspension", labelEn: "Suspension Repair", labelVi: "Sửa Hệ Thống Treo", price: 225 },
  { value: "tune-up", labelEn: "Tune-Up", labelVi: "Bảo Dưỡng Động Cơ", price: 110 },
  { value: "electrical", labelEn: "Electrical Systems", labelVi: "Hệ Thống Điện", price: 135 },
  { value: "timing-belt", labelEn: "Timing Belt Replacement", labelVi: "Thay Dây Curoa Cam", price: 450 },
  { value: "timing-chain", labelEn: "Timing Chain Service", labelVi: "Dịch Vụ Xích Cam", price: 550 },
  { value: "inspection", labelEn: "Vehicle Inspection", labelVi: "Kiểm Tra Xe", price: 65 },
  { value: "diagnostics", labelEn: "Engine Diagnostics", labelVi: "Chẩn Đoán Động Cơ", price: 90 },
  { value: "general", labelEn: "General Repair", labelVi: "Sửa Chữa Chung", price: 90 },
]

const BASE_MOBILE_FEE = 35 // minimum mobile service fee

export function Contact() {
  const { t, language } = useLanguage()

  const [selectedService, setSelectedService] = useState<string>("")
  const [wantsMobileService, setWantsMobileService] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const formRef = useRef<HTMLFormElement | null>(null)

  const selectedServiceData = services.find((s) => s.value === selectedService)
  const totalEstimate = selectedServiceData
    ? selectedServiceData.price + (wantsMobileService ? BASE_MOBILE_FEE : 0)
    : wantsMobileService
    ? BASE_MOBILE_FEE
    : 0

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return

    setSubmitting(true)
    setError(null)
    setFieldErrors({})

    try {
      const form = e.currentTarget
      if (!form.checkValidity()) {
        form.reportValidity()
        throw new Error("invalid")
      }

      const fd = new FormData(form)

      const name = String(fd.get("name") || "").trim()
      const email = String(fd.get("email") || "").trim()
      const phone = String(fd.get("phone") || "").trim()
      const message = String(fd.get("message") || "").trim()
      const website = String(fd.get("website") || "") // honeypot

      const errs: Record<string, string> = {}

      if (!name) errs.name = t("contact.form.errors.nameRequired")
      if (!email) errs.email = t("contact.form.errors.emailRequired")
      if (!phone) errs.phone = t("contact.form.errors.phoneRequired")
      if (!selectedService)
        errs.service = t("contact.form.errors.serviceRequired")
      if (!message || message.length < 5)
        errs.message = t("contact.form.errors.messageRequired")

      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs)
        throw new Error("invalid")
      }

      const payload = {
        name,
        email,
        phone,
        message,
        service: selectedService,
        wantsMobileService,
        estimate: totalEstimate,
        language,
        website, // honeypot
      }

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        let msg = "Request failed"
        try {
          const data = await res.json()
          if (data?.message) msg = data.message
        } catch {
          // ignore
        }
        throw new Error(msg)
      }

      setSubmitted(true)
      form.reset()
      setSelectedService("")
      setWantsMobileService(false)
      setFieldErrors({})
    } catch (err: any) {
      if (err?.message !== "invalid") {
        setError(err?.message || "Something went wrong")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* LEFT: form */}
          <div>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <form
                  ref={formRef}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.form.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
                    {fieldErrors.name && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                    {fieldErrors.email && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(206) 555-1234"
                      required
                    />
                    {fieldErrors.phone && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Service select */}
                  <div className="space-y-2">
                    <Label htmlFor="service">{t("contact.form.service")}</Label>
                    <Select
                      value={selectedService}
                      onValueChange={(v) => {
                        setSelectedService(v)
                        setFieldErrors((prev) => ({ ...prev, service: "" }))
                      }}
                    >
                      <SelectTrigger id="service">
                        <SelectValue
                          placeholder={t("contact.form.selectService")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem
                            key={service.value}
                            value={service.value}
                          >
                            {language === "vi"
                              ? service.labelVi
                              : service.labelEn}{" "}
                            - ${service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.service && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {fieldErrors.service}
                      </p>
                    )}
                  </div>

                  {/* Honeypot field */}
                  <div className="hidden">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>

                  {/* Mobile service checkbox */}
                  <div className="flex items-start space-x-3 p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <Checkbox
                      id="mobile-service"
                      checked={wantsMobileService}
                      onCheckedChange={(checked) =>
                        setWantsMobileService(!!checked)
                      }
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="mobile-service"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {t("contact.form.mobileService")}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("contact.form.mobileServiceDescription")}
                      </p>
                      <p className="text-xs text-primary/80 mt-1 font-medium">
                        {t("contact.form.mobileServiceNote")}
                      </p>
                    </div>
                  </div>

                  {/* Estimate card */}
                  {selectedService && (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("contact.pricing.serviceEstimate")}:
                            </span>
                            <span className="font-semibold">
                              ${selectedServiceData?.price}
                            </span>
                          </div>

                          {wantsMobileService && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                {t("contact.pricing.mobileFee")}:
                              </span>
                              <span className="font-semibold">
                                +${BASE_MOBILE_FEE}+
                              </span>
                            </div>
                          )}

                          <div className="border-t border-primary/20 pt-2 flex justify-between">
                            <span className="font-bold">
                              {t("contact.pricing.total")}:
                            </span>
                            <span className="font-bold text-primary text-lg">
                              ${totalEstimate}+
                            </span>
                          </div>

                          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 mt-3">
                            <p className="text-xs text-yellow-700 dark:text-yellow-400 font-semibold mb-1">
                              {t("contact.pricing.notFixedTitle")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {t("contact.pricing.disclaimer")}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {t("contact.pricing.consultation")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {t("contact.form.message")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={4}
                      required
                    />
                    {fieldErrors.message && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit / success / error */}
                  {submitted ? (
                    <div className="rounded-md border border-green-500/30 bg-green-500/10 p-4 text-sm">
                      <p className="font-semibold">
                        {t("contact.form.successTitle")}
                      </p>
                      <p className="text-muted-foreground">
                        {t("contact.form.successBody")}
                      </p>
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-semibold"
                      disabled={submitting}
                    >
                      {submitting
                        ? t("contact.form.submitting")
                        : t("contact.form.submit")}
                    </Button>
                  )}

                  {error && (
                    <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm">
                      <p className="font-semibold">
                        {t("contact.form.errorTitle")}
                      </p>
                      <p className="text-muted-foreground">
                        {t("contact.form.errorBody")}
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: business info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">
                  {t("contact.info.address")}
                </h3>
                <p className="text-muted-foreground">
                  10525 16th Ave S
                  <br />
                  Seattle, WA 98168
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{t("contact.info.phone")}</h3>
                <p className="text-muted-foreground">(206) 922-9753</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{t("contact.info.email")}</h3>
                <p className="text-muted-foreground">
                  <a
                    href="mailto:service@dqautomotive.net"
                    className="hover:underline"
                  >
                    service@dqautomotive.net
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{t("contact.info.hours")}</h3>
                <p className="text-muted-foreground">
                  {t("contact.info.hoursValue")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
