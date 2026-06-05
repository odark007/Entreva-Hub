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
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  
  if (!programme) return { title: "Programme Not Found" };

  const siteUrl = "https://entrevahub.org";
  
  // Fallback logic for programmes without the new SEO object
  const title = programme.seo?.title || `${programme.title} | Entreva Hub`;
  const description = programme.seo?.description || programme.shortDescription;
  const ogImage = programme.seo?.ogImage || programme.image;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${siteUrl}/programmes/${slug}`,
      siteName: "Entreva Hub",
      images: [
        {
          url: `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: programme.title,
        },
      ],
      locale: "en_GH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`${siteUrl}${ogImage}`],
    },
  };
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