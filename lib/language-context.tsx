"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "vi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

const translations = {
  en: {
    nav: {
      services: "Services",
      about: "About",
      contact: "Contact",
      bookAppointment: "Book Appointment",
    },
    hero: {
      badge: "Mobile Service Available",
      title: "Expert Auto Repair with 15 Years Experience",
      description:
        "Professional mobile automotive service and repair for all makes and models. I'm a certified mechanic with 15 years of experience, and I drive to your location in Seattle, Burien, and Kent with all the tools needed to get you back on the road.",
      serviceArea: "Serving Seattle, Burien & Kent • Mobile Service Fee: Starting at $35",
      scheduleService: "Schedule Service",
      call: "Call",
    },
    services: {
      title: "Our Services",
      subtitle: "Complete automotive care for every need, backed by certified technicians and quality parts.",
      oilChange: {
        title: "Oil Changes",
        description:
          "Fast and professional oil changes with premium synthetic or conventional oil, including filter replacement.",
      },
      brakes: {
        title: "Brake Service",
        description:
          "Complete brake system repair including pads, rotors, calipers, and brake fluid service for optimal stopping power.",
      },
      suspension: {
        title: "Suspension Repair",
        description:
          "Struts, shocks, springs, and complete suspension system diagnostics and replacement for a smooth ride.",
      },
      tuneUp: {
        title: "Tune-Ups",
        description: "Comprehensive engine tune-ups including spark plugs, filters, and performance optimization.",
      },
      electrical: {
        title: "Electrical Systems",
        description:
          "Battery testing and replacement, alternator service, starter repair, and complete electrical diagnostics.",
      },
      timing: {
        title: "Timing Belt & Chain",
        description:
          "Timing belt and timing chain replacement, inspection, and related component service to prevent engine damage.",
      },
      inspection: {
        title: "Vehicle Inspections",
        description: "State inspections, pre-purchase inspections, and comprehensive vehicle health assessments.",
      },
      diagnostics: {
        title: "Engine Diagnostics",
        description:
          "Advanced computer diagnostics, check engine light diagnosis, and complete engine repair services.",
      },
      general: {
        title: "General Repairs",
        description: "Cooling system, exhaust, transmission service, and all other automotive repair needs.",
      },
    },
    about: {
      title: "15 Years of Mobile Auto Repair Excellence",
      description1:
        "I'm a solo mechanic with 15 years of hands-on experience, bringing professional automotive service directly to your home, office, or wherever you need me in the Seattle area. My mobile service means no more waiting at repair shops or arranging rides - I come to you with everything needed to get the job done right.",
      description2:
        "As an ASE-certified technician with over a decade and a half of experience, I arrive fully equipped to handle most repairs and maintenance on-site. I believe in transparent communication, honest pricing, and quality work that stands the test of time. When you work with me, you get personalized service from someone who truly cares about your vehicle.",
      serviceAreas: "Service Areas",
      mobileFee: "Mobile Fee",
      experience: "15+ Years",
    },
    serviceAreas: {
      title: "Service Areas",
      subtitle: "I provide mobile automotive repair services throughout the greater Seattle area.",
      seattle: {
        title: "Seattle",
        description: "Full coverage throughout Seattle neighborhoods and surrounding areas.",
      },
      burien: {
        title: "Burien",
        description: "Complete mobile service for all Burien residents and businesses.",
      },
      kent: {
        title: "Kent",
        description: "Serving the entire Kent area with convenient mobile repair.",
      },
      mobileFee: "Mobile Service Fee",
      mobileFeeAmount: "$35 flat fee",
      mobileFeeDescription:
        "I charge a flat $35 mobile service fee to cover travel to your location. This fee is added to the service cost and allows me to bring professional automotive repair directly to you.",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Ready to schedule your mobile auto repair? Fill out the form below or give me a call.",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        service: "Service Needed",
        selectService: "Select a service",
        mobileService: "Mobile Service (Starting at $35)",
        mobileServiceDescription: "I come to your location with all necessary tools and equipment",
        mobileServiceNote: "Fee may vary based on distance from Seattle base location",
        message: "Message",
        messagePlaceholder: "Tell me about your vehicle and the issue...",
        submit: "Send Message",
      },
      info: {
        phone: "Phone",
        email: "Email",
        hours: "Hours",
        hoursValue: "9 AM - 7 PM, 7 Days a Week",
        address: "Service Area",
      },
      pricing: {
        title: "Estimated Pricing",
        serviceEstimate: "Service Estimate",
        mobileFee: "Mobile Service Fee (Minimum)",
        total: "Total Estimate",
        notFixedTitle: "⚠️ Prices May Vary - Not Fixed",
        disclaimer:
          "These are starting estimates only and are NOT fixed prices. Actual costs may vary significantly based on your vehicle's make, model, year, condition, and specific repair requirements.",
        consultation:
          "In-person consultation and inspection available to provide accurate quote before any work begins.",
      },
    },
    footer: {
      tagline: "Professional mobile automotive repair service for Seattle, Burien, and Kent.",
      quickLinks: "Quick Links",
      services: "Services",
      about: "About",
      contact: "Contact",
      contactInfo: "Contact Info",
      rights: "All rights reserved.",
    },
  },
  vi: {
    nav: {
      services: "Dịch Vụ",
      about: "Giới Thiệu",
      contact: "Liên Hệ",
      bookAppointment: "Đặt Lịch Hẹn",
    },
    hero: {
      badge: "Dịch Vụ Di Động",
      title: "Sửa Chữa Ô Tô Chuyên Nghiệp Với 15 Năm Kinh Nghiệm",
      description:
        "Dịch vụ sửa chữa ô tô di động chuyên nghiệp cho mọi hãng xe và mẫu xe. Tôi là thợ máy được chứng nhận với 15 năm kinh nghiệm, và tôi lái xe đến địa điểm của bạn ở Seattle, Burien và Kent với đầy đủ công cụ cần thiết để giúp bạn quay lại đường.",
      serviceArea: "Phục Vụ Seattle, Burien & Kent • Phí Dịch Vụ Di Động: Bắt Đầu Từ $35",
      scheduleService: "Đặt Lịch Dịch Vụ",
      call: "Gọi",
    },
    services: {
      title: "Dịch Vụ Của Chúng Tôi",
      subtitle:
        "Chăm sóc ô tô toàn diện cho mọi nhu cầu, được hỗ trợ bởi kỹ thuật viên được chứng nhận và phụ tùng chất lượng.",
      oilChange: {
        title: "Thay Dầu",
        description:
          "Thay dầu nhanh chóng và chuyên nghiệp với dầu tổng hợp cao cấp hoặc dầu thông thường, bao gồm thay lọc dầu.",
      },
      brakes: {
        title: "Dịch Vụ Phanh",
        description:
          "Sửa chữa hệ thống phanh hoàn chỉnh bao gồm má phanh, đĩa phanh, caliper và dịch vụ dầu phanh để có lực phanh tối ưu.",
      },
      suspension: {
        title: "Sửa Chữa Hệ Thống Treo",
        description: "Giảm xóc, lò xo và chẩn đoán và thay thế hệ thống treo hoàn chỉnh để có chuyến đi êm ái.",
      },
      tuneUp: {
        title: "Bảo Dưỡng Động Cơ",
        description: "Bảo dưỡng động cơ toàn diện bao gồm bugi, lọc và tối ưu hóa hiệu suất.",
      },
      electrical: {
        title: "Hệ Thống Điện",
        description:
          "Kiểm tra và thay thế ắc quy, dịch vụ máy phát điện, sửa chữa máy khởi động và chẩn đoán điện hoàn chỉnh.",
      },
      timing: {
        title: "Dây Curoa & Xích Cam",
        description:
          "Thay thế, kiểm tra dây curoa cam và xích cam và dịch vụ linh kiện liên quan để ngăn hư hỏng động cơ.",
      },
      inspection: {
        title: "Kiểm Tra Xe",
        description: "Kiểm tra nhà nước, kiểm tra trước khi mua và đánh giá sức khỏe xe toàn diện.",
      },
      diagnostics: {
        title: "Chẩn Đoán Động Cơ",
        description:
          "Chẩn đoán máy tính tiên tiến, chẩn đoán đèn kiểm tra động cơ và dịch vụ sửa chữa động cơ hoàn chỉnh.",
      },
      general: {
        title: "Sửa Chữa Chung",
        description: "Hệ thống làm mát, ống xả, dịch vụ hộp số và tất cả các nhu cầu sửa chữa ô tô khác.",
      },
    },
    about: {
      title: "15 Năm Xuất Sắc Trong Sửa Chữa Ô Tô Di Động",
      description1:
        "Tôi là thợ máy độc lập với 15 năm kinh nghiệm thực tế, mang dịch vụ ô tô chuyên nghiệp trực tiếp đến nhà, văn phòng hoặc bất cứ nơi nào bạn cần tôi trong khu vực Seattle. Dịch vụ di động của tôi có nghĩa là không còn phải chờ đợi tại các cửa hàng sửa chữa hoặc sắp xếp chuyến đi - tôi đến với bạn với mọi thứ cần thiết để hoàn thành công việc đúng cách.",
      description2:
        "Là kỹ thuật viên được chứng nhận ASE với hơn một thập kỷ rưỡi kinh nghiệm, tôi đến đầy đủ trang thiết bị để xử lý hầu hết các sửa chữa và bảo trì tại chỗ. Tôi tin vào giao tiếp minh bạch, giá cả trung thực và công việc chất lượng đứng vững trước thử thách của thời gian. Khi bạn làm việc với tôi, bạn nhận được dịch vụ cá nhân hóa từ người thực sự quan tâm đến xe của bạn.",
      serviceAreas: "Khu Vực Dịch Vụ",
      mobileFee: "Phí Di Động",
      experience: "15+ Năm",
    },
    serviceAreas: {
      title: "Khu Vực Dịch Vụ",
      subtitle: "Tôi cung cấp dịch vụ sửa chữa ô tô di động trên khắp khu vực Seattle lớn.",
      seattle: {
        title: "Seattle",
        description: "Phủ sóng đầy đủ trong các khu phố Seattle và các khu vực xung quanh.",
      },
      burien: {
        title: "Burien",
        description: "Dịch vụ di động hoàn chỉnh cho tất cả cư dân và doanh nghiệp Burien.",
      },
      kent: {
        title: "Kent",
        description: "Phục vụ toàn bộ khu vực Kent với dịch vụ sửa chữa di động tiện lợi.",
      },
      mobileFee: "Phí Dịch Vụ Di Động",
      mobileFeeAmount: "Phí cố định $35",
      mobileFeeDescription:
        "Tôi tính phí dịch vụ di động cố định $35 để trang trải chi phí di chuyển đến địa điểm của bạn. Phí này được thêm vào chi phí dịch vụ và cho phép tôi mang sửa chữa ô tô chuyên nghiệp trực tiếp đến với bạn.",
    },
    contact: {
      title: "Liên Hệ",
      subtitle: "Sẵn sàng đặt lịch sửa chữa ô tô di động của bạn? Điền vào biểu mẫu bên dưới hoặc gọi cho tôi.",
      form: {
        name: "Tên",
        email: "Email",
        phone: "Số Điện Thoại",
        service: "Dịch Vụ Cần Thiết",
        selectService: "Chọn dịch vụ",
        mobileService: "Dịch Vụ Di Động (Bắt Đầu Từ $35)",
        mobileServiceDescription: "Tôi đến địa điểm của bạn với đầy đủ công cụ và thiết bị cần thiết",
        mobileServiceNote: "Phí có thể thay đổi tùy theo khoảng cách từ địa điểm cơ sở Seattle",
        message: "Tin Nhắn",
        messagePlaceholder: "Cho tôi biết về xe của bạn và vấn đề...",
        submit: "Gửi Tin Nhắn",
      },
      info: {
        phone: "Điện Thoại",
        email: "Email",
        hours: "Giờ Làm Việc",
        hoursValue: "9 Sáng - 7 Tối, 7 Ngày Một Tuần",
        address: "Khu Vực Dịch Vụ",
      },
      pricing: {
        title: "Giá Ước Tính",
        serviceEstimate: "Ước Tính Dịch Vụ",
        mobileFee: "Phí Dịch Vụ Di Động (Tối Thiểu)",
        total: "Tổng Ước Tính",
        notFixedTitle: "⚠️ Giá Có Thể Thay Đổi - Không Cố Định",
        disclaimer:
          "Đây chỉ là ước tính ban đầu và KHÔNG phải giá cố định. Chi phí thực tế có thể thay đổi đáng kể dựa trên hãng xe, mẫu xe, năm sản xuất, tình trạng và yêu cầu sửa chữa cụ thể của xe bạn.",
        consultation:
          "Tư vấn và kiểm tra trực tiếp có sẵn để cung cấp báo giá chính xác trước khi bắt đầu bất kỳ công việc nào.",
      },
    },
    footer: {
      tagline: "Dịch vụ sửa chữa ô tô di động chuyên nghiệp cho Seattle, Burien và Kent.",
      quickLinks: "Liên Kết Nhanh",
      services: "Dịch Vụ",
      about: "Giới Thiệu",
      contact: "Liên Hệ",
      contactInfo: "Thông Tin Liên Hệ",
      rights: "Đã đăng ký bản quyền.",
    },
  },
}
