import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProgrammesList } from "@/components/programmes/programmes-list"

export const metadata: Metadata = {
  title: "Programmes | Entreva Hub",
  description:
    "Explore our programmes designed to empower entrepreneurs, build skills, and create meaningful employment in Ghana.",
}

export default function ProgrammesPage() {
  return (
    <main>
      <Navbar />
      <ProgrammesList />
      <Footer />
    </main>
  )
}
