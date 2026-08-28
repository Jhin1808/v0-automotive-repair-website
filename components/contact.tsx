"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, CheckCircle2, Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const ARI_BOOKING_URL =
  "https://www.aribooking.utilitymobileapps.com/index.html?FBProject=ARI&shopID=lxZrYdjOImTXAMx0CtnT8XL8Dsw1"

type ContactItemProps = {
  icon: typeof Phone
  label: string
  children: React.ReactNode
}

function ContactItem({ icon: Icon, label, children }: ContactItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h3 className="mb-1 font-bold">{label}</h3>
        <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

export function Contact() {
  const { t, language } = useLanguage()
  const isVietnamese = language === "vi"

  const bookingSteps = isVietnamese
    ? ["Chọn dịch vụ cần thiết", "Chọn ngày và giờ phù hợp", "Nhập thông tin xe và liên hệ"]
    : ["Choose the service you need", "Select a convenient date and time", "Enter your vehicle and contact details"]

  return (
    <section id="contact" className="bg-card/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {isVietnamese ? "Đặt lịch qua ARI" : "Book with ARI"}
          </div>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            {isVietnamese ? "Đặt Lịch Hẹn" : "Book an Appointment"}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            {isVietnamese
              ? "Sử dụng hệ thống ARI để gửi yêu cầu dịch vụ trực tiếp đến DQ Automotive."
              : "Use our ARI booking system to send your service request directly to DQ Automotive."}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card shadow-xl">
            <CardContent className="p-8 md:p-10">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <Calendar className="h-8 w-8" aria-hidden="true" />
              </div>

              <h3 className="mb-3 text-2xl font-bold md:text-3xl">
                {isVietnamese ? "Lên lịch dịch vụ trực tuyến" : "Schedule your service online"}
              </h3>
              <p className="mb-8 max-w-xl leading-relaxed text-muted-foreground">
                {isVietnamese
                  ? "Bạn sẽ được chuyển đến trang ARI Booking của DQ Automotive để hoàn thành lịch hẹn."
                  : "You will be taken to DQ Automotive's ARI Booking page to complete your appointment request."}
              </p>

              <ul className="mb-8 space-y-4">
                {bookingSteps.map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="w-full text-base font-semibold sm:w-auto" asChild>
                <a href={ARI_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  {isVietnamese ? "Mở ARI Booking" : "Open ARI Booking"}
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              <p className="mt-4 text-sm text-muted-foreground">
                {isVietnamese ? "Trang đặt lịch sẽ mở trong cửa sổ mới." : "The booking page opens in a new tab."}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="space-y-6 p-6">
              <ContactItem icon={MapPin} label={t("contact.info.address")}>
                <p>
                  10525 16th Ave S
                  <br />
                  Seattle, WA 98168
                </p>
              </ContactItem>

              <ContactItem icon={Phone} label={t("contact.info.phone")}>
                <a href="tel:+12069229753" className="transition-colors hover:text-foreground">
                  (206) 922-9753
                </a>
              </ContactItem>

              <ContactItem icon={Mail} label={t("contact.info.email")}>
                <a
                  href="mailto:quang.nguyen@dqautomotivellc.com"
                  className="break-all transition-colors hover:text-foreground"
                >
                  quang.nguyen@dqautomotivellc.com
                </a>
              </ContactItem>

              <ContactItem icon={Clock} label={t("contact.info.hours")}>
                <p>{t("contact.info.hoursValue")}</p>
              </ContactItem>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
