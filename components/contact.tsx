"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, CheckCircle2, Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const ARI_BOOKING_URL =
  "https://www.aribooking.utilitymobileapps.com/index.html?FBProject=ARI&shopID=lxZrYdjOImTXAMx0CtnT8XL8Dsw1"

type ContactItemProps = {
  icon: typeof Phone
  label: string
  children: ReactNode
}

function ContactItem({ icon: Icon, label, children }: ContactItemProps) {
  return (
    <div className="group flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-primary/35 bg-primary/10 transition-colors group-hover:bg-primary">
        <Icon className="h-5 w-5 text-primary transition-colors group-hover:text-white" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h3 className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-white">{label}</h3>
        <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
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
    <section id="contact" className="relative overflow-hidden border-y border-white/10 bg-[#0e0e10] py-20 md:py-32">
      <div className="absolute -right-24 top-10 h-64 w-64 rotate-45 border-[42px] border-primary/[0.07]" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        <div className="mb-12 md:mb-16">
          <div className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {isVietnamese ? "Đặt lịch qua ARI" : "Book with ARI"}
          </div>
          <h2 className="mb-5 max-w-3xl text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-6xl">
            {isVietnamese ? "Đặt Lịch Hẹn" : "Book an Appointment"}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            {isVietnamese
              ? "Sử dụng hệ thống ARI để gửi yêu cầu dịch vụ trực tiếp đến DQ Automotive."
              : "Use our ARI booking system to send your service request directly to DQ Automotive."}
          </p>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
          <Card className="relative overflow-hidden rounded-none border border-primary/40 bg-[#141416] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-y-0 left-0 w-1 bg-primary" aria-hidden="true" />
            <div className="absolute right-0 top-0 h-32 w-32 bg-primary/10 [clip-path:polygon(100%_0,100%_100%,0_0)]" aria-hidden="true" />
            <CardContent className="relative p-8 md:p-12">
              <div className="mb-8 flex h-16 w-16 items-center justify-center bg-primary shadow-[0_0_32px_rgba(220,38,38,0.28)]">
                <Calendar className="h-8 w-8 text-white" aria-hidden="true" />
              </div>

              <h3 className="mb-3 max-w-2xl text-2xl font-black uppercase tracking-tight text-white md:text-4xl">
                {isVietnamese ? "Lên lịch dịch vụ trực tuyến" : "Schedule your service online"}
              </h3>
              <p className="mb-8 max-w-xl leading-relaxed text-zinc-400">
                {isVietnamese
                  ? "Bạn sẽ được chuyển đến trang ARI Booking của DQ Automotive để hoàn thành lịch hẹn."
                  : "You will be taken to DQ Automotive's ARI Booking page to complete your appointment request."}
              </p>

              <ul className="mb-9 grid gap-4 sm:grid-cols-3">
                {bookingSteps.map((step) => (
                  <li key={step} className="flex items-start gap-3 border-t border-white/10 pt-4 text-sm text-zinc-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="h-14 w-full rounded-none px-7 text-sm font-black uppercase tracking-[0.08em] shadow-[0_12px_35px_rgba(220,38,38,0.25)] sm:w-auto" asChild>
                <a href={ARI_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  {isVietnamese ? "Mở ARI Booking" : "Open ARI Booking"}
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              <p className="mt-4 text-xs uppercase tracking-wide text-zinc-500">
                {isVietnamese ? "Trang đặt lịch sẽ mở trong cửa sổ mới." : "The booking page opens in a new tab."}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none border border-white/10 bg-[#0a0a0b]">
            <CardContent className="space-y-5 p-7 md:p-8">
              <ContactItem icon={MapPin} label={t("contact.info.address")}>
                <p>
                  10525 16th Ave S
                  <br />
                  Seattle, WA 98168
                </p>
              </ContactItem>

              <ContactItem icon={Phone} label={t("contact.info.phone")}>
                <a href="tel:+12069229753" className="transition-colors hover:text-white">
                  (206) 922-9753
                </a>
              </ContactItem>

              <ContactItem icon={Mail} label={t("contact.info.email")}>
                <a href="mailto:quang.nguyen@dqautomotivellc.com" className="break-all transition-colors hover:text-white">
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
