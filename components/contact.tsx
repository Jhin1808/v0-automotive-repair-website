"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ExternalLink, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"
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

  return (
    <section id="contact" className="bg-card/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {isVietnamese ? "Đặt lịch trực tuyến" : "Online booking"}
          </div>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            {isVietnamese ? "Đặt Lịch Hẹn" : "Book an Appointment"}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            {isVietnamese
              ? "Chọn dịch vụ, ngày và giờ phù hợp với bạn. Lịch hẹn sẽ được gửi trực tiếp đến hệ thống ARI của chúng tôi."
              : "Choose the service, date, and time that work for you. Your appointment will be sent directly to our ARI booking system."}
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="overflow-hidden border-border/50 bg-card/50 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col gap-4 border-b border-border/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h3 className="text-xl font-bold">
                  {isVietnamese ? "Chọn lịch hẹn của bạn" : "Select your appointment"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isVietnamese
                    ? "Hoàn thành biểu mẫu ARI bên dưới để gửi yêu cầu."
                    : "Complete the ARI form below to submit your request."}
                </p>
              </div>
              <Button variant="outline" className="w-full bg-transparent sm:w-auto" asChild>
                <a href={ARI_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  {isVietnamese ? "Mở cửa sổ mới" : "Open in new tab"}
                </a>
              </Button>
            </div>

            <CardContent className="p-0">
              <iframe
                src={ARI_BOOKING_URL}
                title={isVietnamese ? "Lịch hẹn ARI của DQ Automotive" : "DQ Automotive ARI appointment booking"}
                className="block h-[980px] w-full bg-white sm:h-[900px] lg:h-[840px]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="geolocation"
              />
            </CardContent>

            <div className="border-t border-border/60 bg-muted/30 px-5 py-4 text-center text-sm text-muted-foreground">
              {isVietnamese
                ? "Không thấy biểu mẫu? "
                : "Cannot see the booking form? "}
              <a
                href={ARI_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {isVietnamese ? "Mở ARI Booking trực tiếp" : "Open ARI Booking directly"}
              </a>
              .
            </div>
          </Card>

          <aside className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="font-bold">
                    {isVietnamese ? "Đặt lịch qua ARI" : "Booking powered by ARI"}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {isVietnamese
                    ? "Thông tin lịch hẹn của bạn được gửi trực tiếp đến hệ thống ARI của DQ Automotive để chúng tôi có thể xác nhận dịch vụ."
                    : "Your appointment details go directly to DQ Automotive's ARI system so we can review and confirm your service."}
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
          </aside>
        </div>
      </div>
    </section>
  )
}
