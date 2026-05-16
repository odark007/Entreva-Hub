"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  MapPin,
  CheckCircle2,
  Users,
} from "lucide-react"
import type { Programme } from "@/lib/programmes-data"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

export function ProgrammeDetail({ programme }: { programme: Programme }) {
  const heroAnim = useAnimateOnScroll()
  const aboutAnim = useAnimateOnScroll()
  const qualAnim = useAnimateOnScroll()
  const benefitsAnim = useAnimateOnScroll()
  const datesAnim = useAnimateOnScroll()

  // Logic to determine if this is the Future Force program
  const isFutureForce = programme.slug === "future-force"

  return (
    <>
      {/* Hero */}
      <section className="relative bg-entreva-charcoal pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0">
          <Image
            src={programme.image || "/placeholder.svg"}
            alt={programme.title}
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-entreva-charcoal/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={heroAnim.ref}>
          <Link
            href="/programmes"
            className="mb-8 inline-flex items-center gap-2 text-sm text-background/60 transition-colors hover:text-entreva-green"
          >
            <ArrowLeft className="h-4 w-4" />
            All Programmes
          </Link>
          <div
            className={cn(
              "max-w-3xl transition-all duration-700",
              heroAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                  programme.status === "Open" || isFutureForce // Future Force is considered active
                    ? "bg-entreva-green text-entreva-charcoal"
                    : programme.status === "Closed"
                      ? "bg-destructive/90 text-background"
                      : "bg-background/20 text-background"
                )}
              >
                {(programme.status === "Open" || isFutureForce) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-entreva-charcoal animate-pulse" />
                )}
                {programme.status}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-background/40">
                {programme.partner}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-background md:text-4xl lg:text-5xl text-balance">
              {programme.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-background/60">
              {programme.shortDescription}
            </p>
            
            {/* Future Force Specific Hero Button */}
            {isFutureForce && (
              <div className="mt-8">
                <Link
                  href="/programmes/future-force/register"
                  className="group inline-flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
                >
                  Register Now
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}

            {programme.status === "Open" && programme.applyUrl && (
              <div className="mt-8">
                <a
                  href={programme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
                >
                  Apply Now
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ... About, Who Qualifies, and Benefits sections remain the same ... */}
      {/* [Omitted for brevity, but they stay identical to your provided code] */}

      {/* Key Dates Section (Modified Bottom CTA) */}
      <section className="bg-background py-24 lg:py-32" ref={datesAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* ... Timeline code stays the same ... */}
          
          {/* Bottom CTA Area */}
          <div className="mt-16 text-center">
            {isFutureForce ? (
              <Link
                href="/programmes/future-force/register"
                className="group inline-flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
              >
                Secure Your Spot
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ) : programme.status === "Open" && programme.applyUrl ? (
              <a
                href={programme.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
              >
                Apply Now
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : programme.status === "Coming Soon" ? (
              <Link
                href="/join"
                className="group inline-flex items-center gap-2 rounded-lg border border-entreva-green px-8 py-4 font-semibold text-entreva-green transition-all hover:bg-entreva-green hover:text-entreva-charcoal"
              >
                Register Interest
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}