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

// Price ranges now match the homepage "Quick Service Estimate" section
const services = [
  // Main ones shown on homepage
  {
    value: "oil-change",
    labelEn: "Oil Change",
    labelVi: "Thay Dầu",
    priceRange: "80–120", // $80–$120
  },
  {
    value: "brake-service",
    labelEn: "Brake Service",
    labelVi: "Dịch Vụ Phanh",
    priceRange: "250–600", // $250–$600
  },
  {
    value: "battery-replacement",
    labelEn: "Battery Replacement",
    labelVi: "Thay Bình Ắc Quy",
    priceRange: "180–350", // $180–$350
  },
  {
    value: "diagnostic-scan",
    labelEn: "Diagnostic Scan",
    labelVi: "Chẩn Đoán Động Cơ",
    priceRange: "80–140", // $80–$140
  },

  // Extra services (you can remove or tweak these if you want)
  {
    value: "suspension",
    labelEn: "Suspension Repair",
    labelVi: "Sửa Hệ Thống Treo",
    priceRange: "225–400",
  },
  {
    value: "tune-up",
    labelEn: "Tune-Up",
    labelVi: "Bảo Dưỡng Động Cơ",
    priceRange: "110–200",
  },
  {
    value: "electrical",
    labelEn: "Electrical Systems",
    labelVi: "Hệ Thống Điện",
    priceRange: "135–280",
  },
  {
    value: "timing-belt",
    labelEn: "Timing Belt Replacement",
    labelVi: "Thay Dây Curoa Cam",
    priceRange: "450–850",
  },
  {
    value: "timing-chain",
    labelEn: "Timing Chain Service",
    labelVi: "Dịch Vụ Xích Cam",
    priceRange: "550–1200",
  },
  {
    value: "inspection",
    labelEn: "Vehicle Inspection",
    labelVi: "Kiểm Tra Xe",
    priceRange: "65–120",
  },
  {
    value: "general",
    labelEn: "General Repair",
    labelVi: "Sửa Chữa Chung",
    priceRange: "90–250",
  },
]

const BASE_MOBILE_FEE = 35 // minimum mobile service fee (flat, not ranged)

// Time slots for the dropdown
const TIME_SLOTS = [
  "9:00–11:00 AM",
  "11:00–1:00 PM",
  "1:00–3:00 PM",
  "3:00–5:00 PM",
  "After 5 PM (flexible)",
]

function todayISO() {
  return new Date().toISOString().split("T")[0]
}

export function Contact() {
  const { t, language } = useLanguage()

  const [selectedService, setSelectedService] = useState<string>("")
  const [wantsMobileService, setWantsMobileService] = useState(false)
  const [preferredDate, setPreferredDate] = useState<string>("")
  const [preferredTime, setPreferredTime] = useState<string>("")

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const formRef = useRef<HTMLFormElement | null>(null)

  const selectedServiceData = services.find((s) => s.value === selectedService)
  const serviceRangeLabel = selectedServiceData
    ? `$${selectedServiceData.priceRange}`
    : "--"

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
      if (!preferredDate)
        errs.date = t("contact.form.errors.dateRequired") ?? "Please select a date."
      if (!preferredTime)
        errs.time =
          t("contact.form.errors.timeRequired") ?? "Please select a time window."
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
        estimate: serviceRangeLabel, // keep old key name but now a string range
        estimateRange: serviceRangeLabel,
        mobileFee: wantsMobileService ? BASE_MOBILE_FEE : 0,
        preferredDate,
        preferredTime,
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
      setPreferredDate("")
      setPreferredTime("")
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

                  {/* Date + Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferred-date">
                        {t("contact.form.date") ?? "Preferred date"}
                      </Label>
                      <Input
                        id="preferred-date"
                        name="preferredDate"
                        type="date"
                        min={todayISO()}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        required
                      />
                      {fieldErrors.date && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {fieldErrors.date}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred-time">
                        {t("contact.form.timeWindow") ?? "Preferred time"}
                      </Label>
                      <Select
                        value={preferredTime}
                        onValueChange={(v) => {
                          setPreferredTime(v)
                          setFieldErrors((prev) => ({ ...prev, time: "" }))
                        }}
                      >
                        <SelectTrigger id="preferred-time">
                          <SelectValue
                            placeholder={
                              t("contact.form.selectTimeWindow") ??
                              "Select a time window"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_SLOTS.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldErrors.time && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {fieldErrors.time}
                        </p>
                      )}
                    </div>
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
                            – ${service.priceRange}
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
                              {serviceRangeLabel}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("contact.pricing.mobileFee")}:
                            </span>
                            <span className="font-semibold">
                              {wantsMobileService ? `+$${BASE_MOBILE_FEE}` : "$0"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("contact.pricing.date") ?? "Preferred date"}:
                            </span>
                            <span className="font-semibold">
                              {preferredDate || "--"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("contact.pricing.timeWindow") ??
                                "Preferred time"}:
                            </span>
                            <span className="font-semibold">
                              {preferredTime || "--"}
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
