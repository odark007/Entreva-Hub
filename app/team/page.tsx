import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeamContent } from "@/components/team/team-content"

export const metadata: Metadata = {
  title: "Our Team | Entreva Hub",
  description:
    "Meet the passionate team behind Entreva Hub driving innovation and entrepreneurship in Ghana and Africa.",
}

export default function TeamPage() {
  return (
    <main>
      <Navbar />
      <TeamContent />
      <Footer />
    </main>
  )
}
