"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Users,
  Target,
  Handshake,
  Lightbulb,
  Sprout,
  Monitor,
  Wrench,
} from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const values = [
  {
    icon: Users,
    title: "People-Centered",
    description:
      "We focus on real entrepreneurs, real communities and real problems.",
  },
  {
    icon: Target,
    title: "Impact-Driven",
    description:
      "Job creation and economic empowerment are at the core of everything we do.",
  },
  {
    icon: Handshake,
    title: "Collaborative",
    description:
      "We believe innovation thrives in strong, connected communities.",
  },
  {
    icon: Lightbulb,
    title: "Future-Focused",
    description:
      "We prepare entrepreneurs for today's challenges and tomorrow's opportunities.",
  },
]

const focusAreas = [
  {
    icon: Sprout,
    title: "Agribusiness",
    description:
      "Supporting agricultural value chains and food systems that create sustainable employment for communities.",
  },
  {
    icon: Monitor,
    title: "Technology",
    description:
      "Equipping young people with digital skills and supporting tech startups that drive innovation.",
  },
  {
    icon: Wrench,
    title: "TVET",
    description:
      "Technical and vocational education that builds practical, in-demand skills for the workforce.",
  },
]

export function AboutContent() {
  const heroAnim = useAnimateOnScroll()
  const valuesAnim = useAnimateOnScroll()
  const problemAnim = useAnimateOnScroll()
  const focusAnim = useAnimateOnScroll()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-entreva-charcoal pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Accra cityscape at golden hour"
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-entreva-charcoal/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={heroAnim.ref}>
          <div
            className={cn(
              "max-w-3xl transition-all duration-700",
              heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              About Us
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-background md:text-5xl lg:text-6xl text-balance">
              Empowering Africa through entrepreneurship
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-background/60">
              Entreva Hub is an entrepreneurship and innovation hub dedicated to
              empowering individuals, startups, and businesses to create
              sustainable solutions and meaningful employment. We are a launchpad
              for ideas, a home for innovators, and a catalyst for job creation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
              <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
                Our Mission
              </span>
              <p className="mt-4 text-lg leading-relaxed text-foreground">
                To create jobs through research, innovation, skills development,
                employability training and entrepreneurship development.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
              <span className="text-xs font-mono uppercase tracking-wider text-entreva-blue">
                Our Vision
              </span>
              <p className="mt-4 text-lg leading-relaxed text-foreground">
                To be a catalyst for job creation in Ghana and Africa through
                partnerships that unlock growth and transform communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-background py-24 lg:py-32" ref={focusAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              focusAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Our Focus
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Areas of Impact
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              We focus on creating opportunities in sectors with the highest
              potential for employment for women and youth in Ghana.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon
              return (
                <div
                  key={area.title}
                  className={cn(
                    "group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-entreva-green/30",
                    focusAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: focusAnim.isVisible ? `${(idx + 1) * 150}ms` : "0ms",
                  }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-entreva-green/10 text-entreva-green">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/programmes"
              className="group inline-flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
            >
              Explore Our Programmes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card py-24 lg:py-32" ref={valuesAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              valuesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Why Entreva Hub
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className={cn(
                    "group rounded-2xl border border-border bg-background p-6 transition-all duration-500 hover:border-entreva-green/30 hover:shadow-lg",
                    valuesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: valuesAnim.isVisible ? `${(idx + 1) * 100}ms` : "0ms",
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-entreva-green/10 text-entreva-green transition-colors group-hover:bg-entreva-green/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-entreva-charcoal py-24 lg:py-32" ref={problemAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "mx-auto max-w-3xl text-center transition-all duration-700",
              problemAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              The Challenge
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-background md:text-4xl text-balance">
              Unemployment is a huge problem in Ghana and Africa
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { stat: "~20%", label: "Youth Unemployment in Ghana" },
                { stat: "~50%", label: "Underemployment Rate" },
                { stat: "100M", label: "African Youth at Risk" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-background/10 bg-background/5 p-6"
                >
                  <p className="text-3xl font-bold text-entreva-green">
                    {item.stat}
                  </p>
                  <p className="mt-2 text-sm text-background/60">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-background/60">
              Solutions exist in agriculture and agribusiness, skills training,
              entrepreneurship, and high-yielding areas like renewable energy,
              construction, tourism, and green jobs. Entreva Hub develops
              projects and programs to provide these solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-background py-24 lg:py-32" ref={focusAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              focusAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Our Focus
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Areas of Impact
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              We focus on creating opportunities in sectors with the highest
              potential for employment for women and youth in Ghana.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon
              return (
                <div
                  key={area.title}
                  className={cn(
                    "group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-entreva-green/30",
                    focusAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: focusAnim.isVisible ? `${(idx + 1) * 150}ms` : "0ms",
                  }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-entreva-green/10 text-entreva-green">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/programmes"
              className="group inline-flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
            >
              Explore Our Programmes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
