import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/home/hero"
import { ProgrammesSection } from "@/components/home/programmes-section"
import { ImpactSection } from "@/components/home/impact-section"
import { PartnersSection } from "@/components/home/partners-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProgrammesSection />
      <ImpactSection />
      <PartnersSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
