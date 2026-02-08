import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about/about-content"

export const metadata: Metadata = {
  title: "About | Entreva Hub",
  description:
    "Learn about Entreva Hub - an entrepreneurship and innovation hub dedicated to empowering individuals, startups, and businesses in Ghana and Africa.",
}

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutContent />
      <Footer />
    </main>
  )
}
