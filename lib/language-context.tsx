"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "vi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: <T = string>(key: string) => T
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = <T = string,>(key: string): T => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const segment of keys) {
      if (value == null) break
      value = value[segment]
    }

    return (value ?? key) as T
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

const translations: Record<Language, any> = {
  en: {
    nav: {
      services: "Services",
      about: "About",
      process: "Process",
      reviews: "Reviews",
      contact: "Contact",
      bookAppointment: "Book Appointment",
      responseTime: "Rapid dispatch within 2 hours • 7 days a week",
      subtitle: "Concierge mobile repair for Seattle, Burien & Kent",
    },
    hero: {
      badge: "Concierge Mobile Mechanic",
      title: "Precision automotive repair delivered to your driveway",
      description:
        "ASE-certified diagnostics, transparent communication, and luxury-level service for busy drivers and fleet managers across Seattle, Burien, and Kent.",
      primaryCta: "Book a Mobile Visit",
      secondaryCta: "Talk to Quang",
      badges: {
        warranty: "12 month workmanship warranty",
        response: "<2 hr response window",
        fleet: "Fleet & EV ready",
      },
      metrics: [
        { label: "Years of diagnostics", value: "15+" },
        { label: "Mobile repairs completed", value: "1.8k" },
        { label: "Average response time", value: "<2hr" },
      ],
      card: {
        tag: "Concierge Booking",
        title: "Direct access to your mechanic",
        description: "No call centers. Schedule straight with an ASE-certified tech who travels to you.",
        availabilityLabel: "Today’s mobile capacity",
        availabilityValue: "Seattle · Burien · Kent",
        turnaround: "Same-day slots",
        highlights: [
          "Live status texted to you",
          "Genuine & OEM-grade parts only",
          "Payment after the road test",
        ],
        cta: "Reserve an appointment",
        disclaimer: "Arrival windows confirmed after we validate your vehicle details.",
      },
    },
    services: {
      eyebrow: "Capabilities",
      title: "Full-stack automotive care without the shop visit",
      subtitle:
        "Modern diagnostics, factory-maintenance, and complex repairs completed curbside with calibrated tooling and OEM data.",
      groups: [
        {
          id: "preventive",
          title: "Preventive Maintenance",
          description: "Oil, fluids, filters, tune-ups, and factory schedules for every make.",
          highlights: ["Full synthetic + filter swaps", "Cooling & charging system service", "Digital inspection reports"],
        },
        {
          id: "brakes",
          title: "Brakes & Safety",
          description: "Brake service engineered for Seattle traffic and steep grades.",
          highlights: ["Pads, rotors, and calipers", "ABS & traction diagnostics", "Brake fluid flush & bleed"],
        },
        {
          id: "engine",
          title: "Engine & Timing",
          description: "Precision timing, leak repairs, and drivability solutions.",
          highlights: ["Timing belts & chains", "Gasket and seal replacement", "Fuel & air delivery repairs"],
        },
        {
          id: "electrical",
          title: "Electrical & Diagnostics",
          description: "Programming, CAN diagnostics, and battery systems.",
          highlights: ["Starting/charging failures", "Module programming support", "Advanced scan tool reporting"],
        },
        {
          id: "suspension",
          title: "Suspension & Steering",
          description: "Tight, safe handling tuned for Northwest roads.",
          highlights: ["Struts, shocks, and air systems", "Control arms & bushings", "Ride height & load upgrades"],
        },
        {
          id: "specialty",
          title: "Specialty & Fleet",
          description: "Upfits, seasonal prep, and rolling fleet maintenance.",
          highlights: ["Fleet PM programs", "Commercial van build support", "EV-ready tooling and safety"],
        },
      ],
    },
    whyChoose: {
      eyebrow: "Reasons to trust",
      title: "Boutique-level service with shop-grade tooling",
      subtitle: "You get direct access to the owner-technician, live updates, and transparent authorizations every step.",
      features: [
        { title: "Warranty covered", description: "12 month / 12,000 mile guarantee on labor and supplied parts." },
        { title: "Proven punctuality", description: "Arrival window locked in advance with real-time ETA updates." },
        { title: "Documented inspections", description: "Digital reports with photos, torque specs, and future needs." },
        { title: "Transparent investment", description: "Line-item estimates and parts sourcing before work begins." },
      ],
      cards: [
        { label: "Shop-free repairs", value: "92%", description: "Most jobs finished curbside without towing." },
        { label: "Response time", value: "<2 hrs", description: "Average time from request to callback." },
        { label: "Customer rating", value: "4.9 / 5", description: "Drivers and fleet managers on Google." },
        { label: "Mobile fee", value: "$35", description: "Flat deployment fee within service radius." },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "Streamlined booking designed for busy drivers",
      subtitle: "Everything is handled online or by text so you stay moving.",
      steps: [
        {
          title: "Share your vehicle + symptoms",
          description: "Send a quick rundown and photos from your driveway.",
          detail: "VIN, mileage, and codes help me preload parts and tooling.",
        },
        {
          title: "Confirm arrival window",
          description: "Receive a text with the earliest slot and prep checklist.",
          detail: "We work around office, home, or fleet-yard schedules.",
        },
        {
          title: "On-site diagnostics + approval",
          description: "I verify root cause, present options, and lock pricing.",
          detail: "You sign off digitally before any repair begins.",
        },
        {
          title: "Road test + follow-up",
          description: "Vehicle is road tested, documented, and returned clean.",
          detail: "You get a maintenance roadmap and service receipts.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Proof",
      title: "Drivers keep me on speed dial",
      subtitle: "Personalized communication paired with dealership-grade accuracy.",
      summary: "4.9 ★ average · 120+ documented owners & fleet partners",
      items: [
        {
          name: "Maria Espinoza",
          role: "Property manager, Burien",
          content:
            "Quang handled both our personal SUV and company vans in one afternoon. Transparent pricing and he texts photos of everything.",
        },
        {
          name: "Ethan Liu",
          role: "Sales director, Seattle",
          content:
            "Felt like working with a private mechanic. He set up a maintenance calendar for my Tesla and my wife’s GX in the same visit.",
        },
        {
          name: "Stephanie Harrell",
          role: "Fleet ops, Kent logistics start-up",
          content:
            "He keeps our Sprinter fleet running without losing billable hours. Digital inspections and rapid follow up on parts lead times.",
        },
      ],
    },
    serviceAreas: {
      eyebrow: "Coverage",
      title: "Focused on Seattle, Burien, and Kent",
      subtitle: "Arriving with a fully equipped mobile bay, even in garages and fleet yards.",
      disclaimer: "Need another city? Send a note and we can coordinate extended travel.",
      list: [
        {
          city: "Seattle",
          description: "Downtown condos, tech campuses, and tight parking garages are routine.",
          response: "90 minute response",
        },
        {
          city: "Burien",
          description: "Home base neighborhood with flexible early morning or evening slots.",
          response: "Priority dispatch",
        },
        {
          city: "Kent",
          description: "Distribution centers and commercial fleets on the valley floor.",
          response: "Same-day availability",
        },
      ],
      feeLabel: "Mobile service fee",
      feeValue: "$35 flat within radius",
      feeDescription: "Covers travel, setup, and diagnostic tooling. Waived for multi-vehicle fleet visits.",
    },
    about: {
      eyebrow: "About",
      title: "15 years of dealership training brought to you",
      description1:
        "I am Quang, owner and master technician behind DQ Automotive. After a decade inside Lexus, Toyota, and VW service bays, I built a mobile practice so drivers can skip the waiting room.",
      description2:
        "Every visit is handled end-to-end: diagnosis, sourcing, installation, and digital records. You speak with me directly—no service writers in the middle.",
      stats: [
        { label: "Cars cared for each month", value: "70+" },
        { label: "Fleet partnerships", value: "18" },
        { label: "OEM scan suites on board", value: "3" },
      ],
      pillarTitle: "Operating principles",
      pillarStep: "Milestone",
      pillars: [
        { title: "Precision diagnostics", description: "Factory software, torque procedures, and torque reporting on every job." },
        { title: "Concierge communication", description: "Live text updates, photo reports, and transparent authorizations." },
        { title: "Ownership mindset", description: "I treat every vehicle like a long-term client, not a one-off ticket." },
      ],
    },
    contact: {
      eyebrow: "Book",
      title: "Tell me where and when you need help",
      subtitle: "You will receive a confirmation text within two hours and a fully itemized estimate before I roll out.",
      form: {
        name: "Full name",
        phone: "Phone",
        email: "Email",
        preferredDate: "Preferred date",
        vehicle: "Vehicle (year, make, model)",
        location: "Vehicle location or zip code",
        service: "Service needed",
        selectService: "Select a service",
        customQuote: "Custom quote",
        mobileService: "Request on-site mobile service",
        mobileDescription: "Travel + setup fee waived for multi-vehicle visits",
        notes: "What should I know?",
        notesPlaceholder: "Example: 2017 Tacoma, misfire at idle, already replaced coils last month.",
        submit: "Send request",
        submitting: "Sending…",
      },
      services: {
        preventive: {
          label: "Preventive maintenance",
          description: "Oil, filters, tune-ups, fluids, and factory milestone services.",
        },
        brakes: {
          label: "Brake & safety systems",
          description: "Pads, rotors, calipers, hydraulic service, ABS diagnostics.",
        },
        engine: {
          label: "Engine & timing repairs",
          description: "Timing belts/chains, gasket leaks, drivability corrections.",
        },
        electrical: {
          label: "Electrical & programming",
          description: "No-start, charging, module programming, sensor faults.",
        },
        suspension: {
          label: "Suspension & steering",
          description: "Ride height, bushings, struts, shocks, control arms.",
        },
        fleet: {
          label: "Fleet or commercial",
          description: "Rolling fleet maintenance, EV readiness, and upfit support.",
        },
      },
      summary: {
        title: "Direct line",
        phoneLabel: "Call or text",
        emailLabel: "Email",
        areaLabel: "Service area",
        hoursLabel: "Hours",
        hoursValue: "7 days • 8a – 7p",
      },
      estimate: {
        title: "Instant estimate",
        description: "Shown as a starting point. Final pricing confirmed after on-site diagnostics.",
        placeholder: "Select a service",
        service: "Service",
        mobileFee: "Mobile deployment fee",
        total: "Projected total",
        pending: "Pending selection",
        disclaimer: "Transparent estimate only. Pricing may shift based on VIN-specific parts, complexity, or inspection results.",
      },
      guarantee: {
        eyebrow: "Guarantee",
        title: "12 month / 12,000 mile coverage",
        description: "Workmanship warranty on labor and supplied parts. Transferable to new owners.",
        badge: "Owner operated",
      },
      feedback: {
        success: "Request submitted. I will text you shortly.",
        error: "Something went wrong. Please call or text instead.",
      },
    },
    cta: {
      eyebrow: "Ready",
      title: "Reserve your preferred arrival window",
      subtitle: "Most requests can be scheduled the same day in Seattle, Burien, and Kent.",
      primary: "Book mobile service",
      secondary: "Call (206) 922-9753",
    },
    footer: {
      tagline: "On-site automotive repair for Seattle, Burien, and Kent.",
      description: "Licensed, insured, and warranty-backed mobile diagnostics and repair.",
      quickLinks: "Navigate",
      links: {
        services: "Services",
        about: "About",
        process: "Process",
        contact: "Contact",
      },
      contactInfo: "Contact",
      rights: "All rights reserved.",
    },
  },
  vi: {
    nav: {
      services: "Dich vu",
      about: "Gioi thieu",
      process: "Quy trinh",
      reviews: "Danh gia",
      contact: "Lien he",
      bookAppointment: "Dat lich",
      responseTime: "Phan hoi trong 2 gio • Lam viec 7 ngay",
      subtitle: "Sua chua di dong khu vuc Seattle, Burien, Kent",
    },
    hero: {
      badge: "Tho sua xe di dong",
      title: "Sua chua chinh xac ngay tai bai dau xe cua ban",
      description:
        "Ky su ASE voi thong tin minh bach va dich vu cao cap cho tai xe va doi xe tai Seattle, Burien, Kent.",
      primaryCta: "Dat lich di dong",
      secondaryCta: "Goi cho Quang",
      badges: {
        warranty: "Bao hanh 12 thang",
        response: "Phan hoi <2 gio",
        fleet: "San sang cho doi xe",
      },
      metrics: [
        { label: "Nam kinh nghiem", value: "15+" },
        { label: "Xe sua chua", value: "1.8k" },
        { label: "Thoi gian phan hoi", value: "<2g" },
      ],
      card: {
        tag: "Dat lich truc tiep",
        title: "Lien lac thang voi ky su",
        description: "Khong qua tong dai. Ban lam viec truc tiep voi ky su den tan noi.",
        availabilityLabel: "Kha dung hom nay",
        availabilityValue: "Seattle · Burien · Kent",
        turnaround: "Co lich trong ngay",
        highlights: ["Nhan tin cap nhat", "Chi dung phu tung chinh hang", "Thanh toan sau khi chay thu"],
        cta: "Giu lich hen",
        disclaimer: "Xac nhan khung gio sau khi nhan thong tin xe.",
      },
    },
    services: {
      eyebrow: "Dich vu",
      title: "Cham soc toan dien khong can vao xuong",
      subtitle: "Chan doan, bao duong va sua chua phuc tap thuc hien ngay tai nha ban.",
      groups: [
        {
          id: "preventive",
          title: "Bao duong dinh ky",
          description: "Thay dau, loc, nuoc lam mat va lich dinh ky OEM.",
          highlights: ["Dau tong hop + loc", "Kiem tra he thong lam mat", "Bao cao ky thuat so"],
        },
        {
          id: "brakes",
          title: "Phanh va an toan",
          description: "Phanh chuan xac cho giao thong Seattle.",
          highlights: ["Mam phanh, dia, cuc phanh", "Chan doan ABS", "Xa gio va thay dau phanh"],
        },
        {
          id: "engine",
          title: "Dong co & timing",
          description: "Day cam, ro ri, sua loi van hanh.",
          highlights: ["Day cam, xich cam", "Thay phot, roan", "He thong nhien lieu va khi vao"],
        },
        {
          id: "electrical",
          title: "Dien va chan doan",
          description: "Lap trinh, chan doan CAN, binh va sac.",
          highlights: ["De, sac, phan tu", "Lap trinh ECU", "Bao cao chan doan nang cao"],
        },
        {
          id: "suspension",
          title: "Giam soc & lai",
          description: "Cam giac lai chac chan cho duong pho Tay Bac.",
          highlights: ["Phuoc, lo xo, air", "Rotuyn, cao su", "Can chinh chieu cao tai"],
        },
        {
          id: "specialty",
          title: "Doi xe & nang cap",
          description: "Bao duong doi xe, EV va ho tro upfit.",
          highlights: ["Chuoi doi xe dinh ky", "Ho tro xe thuong mai", "Dung cu san sang EV"],
        },
      ],
    },
    whyChoose: {
      eyebrow: "Ly do",
      title: "Dich vu cao cap voi dung cu chuan xuong",
      subtitle: "Ban lam viec thang voi chu so huu ky su va nhan cap nhat minh bach.",
      features: [
        { title: "Bao hanh", description: "Bao hanh 12 thang / 12,000 mile tren cong va phu tung." },
        { title: "Dung gio", description: "Thong bao khung gio cu the va cap nhat ETA." },
        { title: "Bao cao so", description: "Anh chup, so lieu mo men, ke hoach bao tri." },
        { title: "Gia ro rang", description: "Bao gia chi tiet truoc khi lam." },
      ],
      cards: [
        { label: "Sua chua tai cho", value: "92%", description: "Khong can keo xe vao xuong." },
        { label: "Thoi gian phan hoi", value: "<2 gio", description: "Trung binh tu luc gui yeu cau." },
        { label: "Danh gia", value: "4.9 / 5", description: "Chu xe va doi xe tren Google." },
        { label: "Phi di dong", value: "$35", description: "Phi co dinh trong pham vi phuc vu." },
      ],
    },
    process: {
      eyebrow: "Quy trinh",
      title: "Don gian cho nguoi ban ron",
      subtitle: "Moi buoc duoc xu ly qua online hoac tin nhan.",
      steps: [
        {
          title: "Mo ta xe va hien tuong",
          description: "Gui VIN, hinh anh va thong tin ban co.",
          detail: "Giup toi chuan bi phu tung va dung cu.",
        },
        {
          title: "Xac nhan khung gio",
          description: "Nhan tin thong bao khung gio som nhat.",
          detail: "Linh hoat theo lich lam viec cua ban.",
        },
        {
          title: "Chan doan & duyet viec",
          description: "Xac dinh nguyen nhan va bao gia truoc.",
          detail: "Ky duyet tren dien thoai truoc khi lam.",
        },
        {
          title: "Chay thu & ban giao",
          description: "Chay thu, chup hinh va ban giao sach se.",
          detail: "Gui ke hoach bao tri va hoa don so.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Danh gia",
      title: "Khach hang luon goi lai",
      subtitle: "Giao tiep ro rang va chuan doan y nhu dai ly.",
      summary: "Trung binh 4.9 sao · hon 120 chu xe",
      items: [
        {
          name: "Maria Espinoza",
          role: "Quan ly bat dong san, Burien",
          content: "Anh duong nhu ky su rieng cua gia dinh chung toi. Gia ro rang va co anh chup moi buoc.",
        },
        {
          name: "Ethan Liu",
          role: "Giam doc ban hang, Seattle",
          content: "Lap lich dong thoi cho Tesla va Lexus cua vo toi chi trong mot buoi.",
        },
        {
          name: "Stephanie Harrell",
          role: "Quan ly doi xe, Kent",
          content: "Giu doi Sprinter chay lien tuc ma khong mat gio lam viec. Bao cao dien tu rat chi tiet.",
        },
      ],
    },
    serviceAreas: {
      eyebrow: "Khu vuc",
      title: "Tap trung Seattle, Burien, Kent",
      subtitle: "Xe di dong day du dung cu di toi nha, van phong hoac bai xe.",
      disclaimer: "Can noi khac? Hay gui tin de sap xep.",
      list: [
        { city: "Seattle", description: "Chung cu, cong ty cong nghe, bai do hep cung xu ly.", response: "90 phut phan hoi" },
        { city: "Burien", description: "Khu vuc gia dinh va lich linh hoat sang som hoac toi.", response: "Uu tien" },
        { city: "Kent", description: "Kho van, doi xe thuong mai, bai do cong nghiep.", response: "Co lich trong ngay" },
      ],
      feeLabel: "Phi di dong",
      feeValue: "$35 trong pham vi",
      feeDescription: "Bao gom di chuyen, lap dat va dung cu chan doan.",
    },
    about: {
      eyebrow: "Ve chung toi",
      title: "15 nam kinh nghiem dai ly mang den nha ban",
      description1:
        "Toi la Quang, chu so huu va ky su chinh cua DQ Automotive. Sau nhieu nam lam viec tai Lexus, Toyota va VW, toi lap nen dich vu di dong de khach hang khong phai doi.",
      description2:
        "Moi lich hen deu do toi truc tiep quan ly: chan doan, dat hang, lap dat va ho so dien tu.",
      stats: [
        { label: "Xe phuc vu moi thang", value: "70+" },
        { label: "Doi xe hop tac", value: "18" },
        { label: "Bo cong chan doan OEM", value: "3" },
      ],
      pillarTitle: "Nguyen tac lam viec",
      pillarStep: "Cot moc",
      pillars: [
        { title: "Chan doan chinh xac", description: "Dung soft OEM, mo men chuan, luu lai trong bao cao." },
        { title: "Giao tiep ro rang", description: "Tin nhan truc tiep, anh chup, duyet cong viec online." },
        { title: "Tu duy chu xe", description: "Xem moi chiec xe la quan he lau dai." },
      ],
    },
    contact: {
      eyebrow: "Lien he",
      title: "Cho toi biet xe va dia diem",
      subtitle: "Se nhan duoc tin nhan xac nhan trong 2 gio va bao gia chi tiet truoc khi toi khoi hanh.",
      form: {
        name: "Ho ten",
        phone: "So dien thoai",
        email: "Email",
        preferredDate: "Ngay mong muon",
        vehicle: "Thong tin xe",
        location: "Dia chi hoac ma zip",
        service: "Dich vu",
        selectService: "Chon dich vu",
        customQuote: "Bao gia rieng",
        mobileService: "Yeu cau di dong tai cho",
        mobileDescription: "Mien phi neu co nhieu xe trong cung dia diem",
        notes: "Mo ta them",
        notesPlaceholder: "Vi du: Tacoma 2017, rung khi garanti, da thay bobin.",
        submit: "Gui yeu cau",
        submitting: "Dang gui…",
      },
      services: {
        preventive: { label: "Bao duong dinh ky", description: "Thay dau, loc, lich dinh ky." },
        brakes: { label: "Phanh & an toan", description: "Mam, dia, ABS, dau phanh." },
        engine: { label: "Dong co & timing", description: "Day cam, ro ri, sua loi van hanh." },
        electrical: { label: "Dien & lap trinh", description: "No start, sac, ECU, cam bien." },
        suspension: { label: "He thong treo & lai", description: "Phuoc, rotuyn, giam soc." },
        fleet: { label: "Doi xe / thuong mai", description: "Bao duong doi xe, ho tro EV va upfit." },
      },
      summary: {
        title: "Lien lac",
        phoneLabel: "Goi hoac nhan tin",
        emailLabel: "Email",
        areaLabel: "Khu vuc",
        hoursLabel: "Gio lam viec",
        hoursValue: "7 ngay • 8h – 19h",
      },
      estimate: {
        title: "Uoc tinh nhanh",
        description: "Chi la muc gia khoi diem. Gia cuoi cung xac nhan sau khi kiem tra.",
        placeholder: "Chon dich vu",
        service: "Dich vu",
        mobileFee: "Phi di dong",
        total: "Tong tam tinh",
        pending: "Dang cho",
        disclaimer: "Gia co the thay doi theo phu tung, VIN va muc do hu hong.",
      },
      guarantee: {
        eyebrow: "Bao hanh",
        title: "Bao hanh 12 thang / 12,000 mile",
        description: "Ap dung cho cong va phu tung do toi cung cap.",
        badge: "Chu so huu truc tiep",
      },
      feedback: {
        success: "Da nhan yeu cau, toi se lien he som.",
        error: "Co loi xay ra, vui long goi giup.",
      },
    },
    cta: {
      eyebrow: "San sang",
      title: "Giu khung gio phuc vu",
      subtitle: "Da so yeu cau co the xu ly trong ngay tai Seattle, Burien, Kent.",
      primary: "Dat dich vu",
      secondary: "Goi (206) 922-9753",
    },
    footer: {
      tagline: "Sua chua o to tai cho khu vuc Seattle.",
      description: "Da cap giay phep, bao hiem va bao hanh ro rang.",
      quickLinks: "Lien ket",
      links: {
        services: "Dich vu",
        about: "Gioi thieu",
        process: "Quy trinh",
        contact: "Lien he",
      },
      contactInfo: "Thong tin",
      rights: "Bao luu moi quyen.",
    },
  },
}
