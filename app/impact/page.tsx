import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImpactContent } from "@/components/impact/impact-content"

export const metadata: Metadata = {
  title: "Impact | Entreva Hub",
  description:
    "See how Entreva Hub is driving change across Ghana and Africa through entrepreneurship, skills development, and job creation.",
}

export default function ImpactPage() {
  return (
    <main>
      <Navbar />
      <ImpactContent />
      <Footer />
    </main>
  )
}
