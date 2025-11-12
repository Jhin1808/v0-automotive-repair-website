// app/page.tsx
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { ServiceAreas } from "@/components/service-areas"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-white text-gray-800">
        <section id="home">
          <Hero />
        </section>

        <section id="services" className="scroll-mt-24">
          <Services />
        </section>

        <section id="service-areas" className="scroll-mt-24">
          <ServiceAreas />
        </section>

        <section id="about" className="scroll-mt-24">
          <About />
        </section>

        <section id="contact" className="scroll-mt-24">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}

