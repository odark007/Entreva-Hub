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
                  programme.status === "Open"
                    ? "bg-entreva-green/90 text-entreva-charcoal"
                    : programme.status === "Closed"
                      ? "bg-destructive/90 text-background"
                      : "bg-background/20 text-background"
                )}
              >
                {programme.status === "Open" && (
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

      {/* About */}
      <section className="bg-background py-24 lg:py-32" ref={aboutAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div
              className={cn(
                "lg:col-span-3 transition-all duration-700",
                aboutAnim.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
                Overview
              </span>
              <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                About the Programme
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {programme.overview}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {programme.about}
              </p>
            </div>

            {/* Sidebar Info */}
            <div
              className={cn(
                "lg:col-span-2 transition-all duration-700 delay-200",
                aboutAnim.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <div className="rounded-2xl border border-border bg-card p-6">
                {/* Regions */}
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-entreva-green" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Eligible Regions
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {programme.regions.map((region) => (
                        <span
                          key={region}
                          className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="my-6 h-px bg-border" />

                {/* Contact */}
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-entreva-blue" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Contact
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Call{" "}
                      <a
                        href="tel:+233303980408"
                        className="text-entreva-green hover:underline"
                      >
                        0303 980 408
                      </a>{" "}
                      for enquiries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="bg-card py-24 lg:py-32" ref={qualAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              qualAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Eligibility
            </span>
            <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
              Who Qualifies?
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programme.qualifications.map((qual, idx) => (
              <div
                key={qual.title}
                className={cn(
                  "rounded-2xl border border-border bg-background p-6 transition-all duration-500",
                  qualAnim.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: qualAnim.isVisible
                    ? `${(idx + 1) * 150}ms`
                    : "0ms",
                }}
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {qual.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {qual.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-entreva-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-entreva-charcoal py-24 lg:py-32" ref={benefitsAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              benefitsAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              What You Get
            </span>
            <h2 className="mt-2 text-2xl font-bold text-background md:text-3xl">
              Programme Benefits
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {programme.benefits.map((benefit, idx) => (
              <div
                key={benefit}
                className={cn(
                  "flex items-start gap-4 rounded-xl border border-background/10 bg-background/5 p-6 transition-all duration-500",
                  benefitsAnim.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: benefitsAnim.isVisible
                    ? `${(idx + 1) * 100}ms`
                    : "0ms",
                }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-entreva-green/20 text-sm font-bold text-entreva-green">
                  {idx + 1}
                </div>
                <p className="text-base text-background/80">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Dates */}
      <section className="bg-background py-24 lg:py-32" ref={datesAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              datesAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Timeline
            </span>
            <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
              Key Dates
            </h2>
          </div>
          <div className="mt-12">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

              {programme.keyDates.map((date, idx) => (
                <div
                  key={date.label}
                  className={cn(
                    "relative mb-8 flex flex-col gap-1 pl-12 md:flex-row md:items-center md:gap-8 md:pl-0 transition-all duration-500",
                    idx % 2 === 0 ? "md:flex-row-reverse md:text-right" : "",
                    datesAnim.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: datesAnim.isVisible
                      ? `${(idx + 1) * 100}ms`
                      : "0ms",
                  }}
                >
                  {/* Dot */}
                  <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-entreva-green bg-background md:left-1/2 md:-translate-x-1/2" />

                  <div className="flex-1 md:px-8">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-entreva-green md:hidden" />
                      <span className="text-sm font-semibold text-foreground">
                        {date.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {date.date}
                    </p>
                  </div>
                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>

          {/* Apply CTA */}
          {programme.status === "Open" && programme.applyUrl && (
            <div className="mt-16 text-center">
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

          {programme.status === "Coming Soon" && (
            <div className="mt-16 text-center">
              <Link
                href="/join"
                className="group inline-flex items-center gap-2 rounded-lg border border-entreva-green px-8 py-4 font-semibold text-entreva-green transition-all hover:bg-entreva-green hover:text-entreva-charcoal"
              >
                Register Interest
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
