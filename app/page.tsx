import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { ServiceAreas } from "@/components/service-areas"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { CtaBanner } from "@/components/cta-banner"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <ServiceAreas />
      <About />
      <Contact />
      <CtaBanner />
      <Footer />
    </main>
  )
}
