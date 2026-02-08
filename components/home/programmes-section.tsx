"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const programmes = [
  {
    slug: "mtn-sme-support",
    title: "MTN SME Support Programme",
    description:
      "Unlock the full potential of your SME with world-class business training, mentorship, and funding of up to GHS 20,000.",
    image: "/images/programme-mtn.jpg",
    status: "Open" as const,
    partner: "MTN Ghana",
  },
  {
    slug: "agribusiness-accelerator",
    title: "Agribusiness Accelerator",
    description:
      "Supporting entrepreneurs in agriculture and agribusiness value chains to scale operations and create employment.",
    image: "/images/programme-agribusiness.jpg",
    status: "Coming Soon" as const,
    partner: "Entreva Hub",
  },
  {
    slug: "tech-skills-bootcamp",
    title: "Tech Skills Bootcamp",
    description:
      "Equipping young Ghanaians with in-demand digital and technology skills for the future of work.",
    image: "/images/programme-tech.jpg",
    status: "Coming Soon" as const,
    partner: "Entreva Hub",
  },
]

export function ProgrammesSection() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section className="bg-background py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "flex flex-col gap-4 md:flex-row md:items-end md:justify-between transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              What We Offer
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Our Current Programmes
            </h2>
          </div>
          <Link
            href="/programmes"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-entreva-green"
          >
            View All Programmes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Programme Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programmes.map((programme, idx) => (
            <Link
              key={programme.slug}
              href={`/programmes/${programme.slug}`}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-entreva-green/30 hover:shadow-lg hover:shadow-entreva-green/5",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDelay: isVisible ? `${(idx + 1) * 150}ms` : "0ms",
              }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={programme.image || "/placeholder.svg"}
                  alt={programme.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-entreva-charcoal/20 transition-opacity group-hover:opacity-0" />
                {/* Status Badge */}
                <div className="absolute left-4 top-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm",
                      programme.status === "Open"
                        ? "bg-entreva-green/90 text-entreva-charcoal"
                        : "bg-background/80 text-foreground"
                    )}
                  >
                    {programme.status === "Open" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-entreva-charcoal animate-pulse" />
                    )}
                    {programme.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {programme.partner}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-entreva-green transition-colors">
                  {programme.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {programme.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-entreva-green">
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
