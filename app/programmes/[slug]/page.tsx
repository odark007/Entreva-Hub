import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProgrammeDetail } from "@/components/programmes/programme-detail"
import { programmes } from "@/lib/programmes-data"

export async function generateStaticParams() {
  return programmes.map((programme) => ({
    slug: programme.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const programme = programmes.find((p) => p.slug === slug)
  if (!programme) return { title: "Programme Not Found" }

  return {
    title: `${programme.title} | Entreva Hub`,
    description: programme.shortDescription,
  }
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const programme = programmes.find((p) => p.slug === slug)

  if (!programme) notFound()

  return (
    <main>
      <Navbar />
      <ProgrammeDetail programme={programme} />
      <Footer />
    </main>
  )
}
