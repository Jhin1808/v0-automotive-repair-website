"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const [serviceMode, setServiceMode] = useState<"mobile" | "dropoff">("mobile")
  const [preferredDate, setPreferredDate] = useState<string>("")
  const [preferredTime, setPreferredTime] = useState<string>("")

  const selectedServiceData = services.find((s) => s.value === selectedService)
  const wantsMobileService = serviceMode === "mobile"

  const totalEstimate = selectedServiceData
    ? selectedServiceData.price + (wantsMobileService ? BASE_MOBILE_FEE : 0)
    : wantsMobileService
    ? BASE_MOBILE_FEE
    : 0

  return (
    <section id="contact" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("contact.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* LEFT: booking form */}
          <div>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                {/* TODO: wire this to your API route / email handler */}
                <form className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.form.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
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
                  </div>

                  {/* Service + date/time row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service">{t("contact.form.service")}</Label>
                      <Select
                        value={selectedService}
                        onValueChange={setSelectedService}
                      >
                        <SelectTrigger id="service">
                          <SelectValue
                            placeholder={t("contact.form.selectService")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {language === "vi"
                                ? service.labelVi
                                : service.labelEn}{" "}
                              - ${service.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

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
                    </div>
                  </div>

                  {/* Time slot */}
                  <div className="space-y-2">
                    <Label htmlFor="preferred-time">
                      {t("contact.form.timeWindow") ?? "Preferred time window"}
                    </Label>
                    <Select
                      value={preferredTime}
                      onValueChange={setPreferredTime}
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
                  </div>

                  {/* Service mode: mobile vs drop-off */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {t("contact.form.serviceType") ??
                        "How would you like the service?"}
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={serviceMode === "mobile" ? "default" : "outline"}
                        className="justify-start h-auto py-3 px-3 text-left"
                        onClick={() => setServiceMode("mobile")}
                      >
                        <div>
                          <p className="font-semibold text-sm">
                            {t("contact.form.mobileService") ??
                              "Mobile service (we come to you)"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("contact.form.mobileServiceDescription") ??
                              "We come to your driveway / workplace. A mobile visit fee is added."}
                          </p>
                          <p className="text-xs text-primary mt-1 font-medium">
                            {t("contact.form.mobileServiceNote") ??
                              `+${BASE_MOBILE_FEE}$ mobile fee per visit (estimate).`}
                          </p>
                        </div>
                      </Button>

                      <Button
                        type="button"
                        variant={serviceMode === "dropoff" ? "default" : "outline"}
                        className="justify-start h-auto py-3 px-3 text-left"
                        onClick={() => setServiceMode("dropoff")}
                      >
                        <div>
                          <p className="font-semibold text-sm">
                            {t("contact.form.dropoffService") ??
                              "Drop-off / meet at location"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("contact.form.dropoffDescription") ??
                              "You meet us at an agreed location or shop area. No mobile fee applied."}
                          </p>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Address (only required if mobile) */}
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      {wantsMobileService
                        ? t("contact.form.addressMobile") ??
                          "Service address (for mobile visits)"
                        : t("contact.form.address") ??
                          "Preferred area / cross streets"}
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder={
                        wantsMobileService
                          ? "123 Main St, Seattle, WA 98168"
                          : "Southcenter / Burien / Kent area..."
                      }
                      required={wantsMobileService}
                    />
                    <p className="text-xs text-muted-foreground">
                      {wantsMobileService
                        ? t("contact.form.addressHintMobile") ??
                          "Please make sure there is safe, legal parking space for us to work."
                        : t("contact.form.addressHint") ??
                          "This just helps us estimate travel time and confirm we serve your area."}
                    </p>
                  </div>

                  {/* Estimate card */}
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {t("contact.pricing.serviceEstimate") ??
                              "Service estimate"}
                            :
                          </span>
                          <span className="font-semibold">
                            {selectedServiceData
                              ? `$${selectedServiceData.price}`
                              : "--"}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {t("contact.pricing.mobileFee") ??
                              "Mobile visit fee"}
                            :
                          </span>
                          <span className="font-semibold">
                            {wantsMobileService ? `+${BASE_MOBILE_FEE}$` : "$0"}
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
                            {t("contact.pricing.timeWindow") ?? "Time window"}:
                          </span>
                          <span className="font-semibold">
                            {preferredTime || "--"}
                          </span>
                        </div>

                        <div className="border-t border-primary/20 pt-2 flex justify-between items-center mt-2">
                          <span className="font-bold">
                            {t("contact.pricing.total") ?? "Estimated total"}:
                          </span>
                          <span className="font-bold text-primary text-lg">
                            {totalEstimate > 0 ? `$${totalEstimate}+` : "--"}
                          </span>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 mt-3">
                          <p className="text-xs text-yellow-700 dark:text-yellow-400 font-semibold mb-1">
                            {t("contact.pricing.notFixedTitle") ??
                              "This is an estimate, not a fixed quote"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("contact.pricing.disclaimer") ??
                              "Final pricing depends on diagnosis, exact parts, and vehicle condition."}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {t("contact.pricing.consultation") ??
                              "We’ll confirm exact pricing with you before starting any work."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={
                        t("contact.form.messagePlaceholder") ??
                        "Describe what’s going on with your vehicle (noises, warning lights, recent work, etc.)"
                      }
                      rows={4}
                    />
                  </div>

                  {/* Hidden fields to send mode/date/time to your API if you hook it up */}
                  <input type="hidden" name="serviceMode" value={serviceMode} />
                  <input type="hidden" name="estimatedTotal" value={totalEstimate} />

                  <Button type="submit" size="lg" className="w-full font-semibold">
                    {t("contact.form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: static info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{t("contact.info.address")}</h3>
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
                  quang.nguyen@dqautomotivellc.com
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
