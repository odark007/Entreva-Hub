"use client"

import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const partners = [
  "MTN Ghana",
  "MTN Foundation",
  "Ghana Enterprise Agency",
  "Ministry of Trade",
  "African Development Bank",
  "World Bank",
  "UNDP Ghana",
  "Butterfly Technologies",
]

export function PartnersSection() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section className="bg-background py-24 lg:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Trusted By
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Our Partners & Collaborators
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div
        className={cn(
          "mt-12 transition-all duration-700 delay-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="relative flex overflow-hidden">
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

          <div className="flex animate-marquee items-center gap-12">
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={`${partner}-${idx}`}
                className="flex h-16 shrink-0 items-center justify-center rounded-xl border border-border bg-card px-8"
              >
                <span className="whitespace-nowrap text-sm font-semibold text-muted-foreground">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
