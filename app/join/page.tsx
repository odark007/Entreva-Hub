import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JoinContent } from "@/components/join/join-content"

export const metadata: Metadata = {
  title: "Join the Hub | Entreva Hub",
  description:
    "Join Entreva Hub and access world-class training, mentorship, funding opportunities, and a community of innovators.",
}

export default function JoinPage() {
  return (
    <main>
      <Navbar />
      <JoinContent />
      <Footer />
    </main>
  )
}
