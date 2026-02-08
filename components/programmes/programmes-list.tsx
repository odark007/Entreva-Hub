"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"
import { programmes } from "@/lib/programmes-data"

export function ProgrammesList() {
  const heroAnim = useAnimateOnScroll()
  const listAnim = useAnimateOnScroll()

  return (
    <>
      {/* Hero */}
      <section className="bg-entreva-charcoal pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={heroAnim.ref}>
          <div
            className={cn(
              "max-w-3xl transition-all duration-700",
              heroAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Explore
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-background md:text-5xl lg:text-6xl">
              Our Programmes
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-background/60">
              Discover opportunities designed to empower entrepreneurs, build
              critical skills, and create meaningful employment across Ghana and
              Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Programme List */}
      <section className="bg-background py-24 lg:py-32" ref={listAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme, idx) => (
              <Link
                key={programme.slug}
                href={`/programmes/${programme.slug}`}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-entreva-green/30 hover:shadow-xl hover:shadow-entreva-green/5",
                  listAnim.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: listAnim.isVisible
                    ? `${(idx + 1) * 150}ms`
                    : "0ms",
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

                  {/* Status */}
                  <div className="absolute left-4 top-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm",
                        programme.status === "Open"
                          ? "bg-entreva-green/90 text-entreva-charcoal"
                          : programme.status === "Closed"
                            ? "bg-destructive/90 text-background"
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
                    {programme.shortDescription}
                  </p>

                  {/* Regions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {programme.regions.slice(0, 3).map((region) => (
                      <span
                        key={region}
                        className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                      >
                        {region}
                      </span>
                    ))}
                  </div>

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
    </>
  )
}
