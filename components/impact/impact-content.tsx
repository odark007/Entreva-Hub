"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Users,
  MapPin,
  TrendingUp,
  Building2,
} from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { useCountUp } from "@/hooks/use-count-up"
import { cn } from "@/lib/utils"

const impactMetrics = [
  { value: 500, suffix: "+", label: "MSMEs Targeted in 5 years", icon: Briefcase },
  { value: 3000, suffix: "+", label: "Jobs to be created", icon: TrendingUp },
  { value: 4, suffix: "", label: "Focus Regions", icon: MapPin },
  { value: 5, suffix: " Years", label: "Programme Span", icon: Building2 },
  { value: 100, suffix: "M", label: "African Youth At Risk", icon: Users },
  { value: 50, suffix: "%", label: "Underemployment Rate", icon: GraduationCap },
]

const impactStories = [
  {
    title: "Empowering Entrepreneurs",
    description:
      "Supporting startups that generate sustainable employment and bridge the gap between ideas, skills, and market opportunities.",
  },
  {
    title: "Bridging the Skills Gap",
    description:
      "Creating employment for young people through practical skills training and employability development programmes.",
  },
  {
    title: "Strengthening Ecosystems",
    description:
      "Building local innovation and entrepreneurial ecosystems that foster collaboration and economic inclusion.",
  },
  {
    title: "Community Impact",
    description:
      "Developing stories of impact in the lives of people and communities across Ghana through sustainable enterprise and job creation.",
  },
]

const focusRegions = [
    {
    name: "Greater Accra",
    description: "Supporting urban and entrepreneurs in the capital city.",
  },
  {
    name: "Northern Region",
    description: "Supporting agricultural and enterprise development in Northern Ghana.",
  },
  {
    name: "Upper East",
    description: "Empowering communities through skills and business development.",
  },
  {
    name: "Savannah Region",
    description: "Creating opportunities for youth and women entrepreneurs.",
  },
]

export function ImpactContent() {
  const heroAnim = useAnimateOnScroll()
  const metricsAnim = useAnimateOnScroll()
  const storiesAnim = useAnimateOnScroll()
  const regionsAnim = useAnimateOnScroll()
  const visionAnim = useAnimateOnScroll()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-entreva-charcoal pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          <Image
            src="/images/impact-hero.jpg"
            alt="Entrepreneurs celebrating success"
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
              Our Impact
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-background md:text-5xl lg:text-6xl text-balance">
              Driving change across Ghana and Africa
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-background/60">
              We are building an ecosystem that empowers entrepreneurs to launch
              and grow businesses, creating sustainable employment and economic
              growth.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-background py-24 lg:py-32" ref={metricsAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              metricsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              By the Numbers
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Impact Metrics
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {impactMetrics.map((metric, idx) => (
              <MetricItem
                key={metric.label}
                metric={metric}
                idx={idx}
                isVisible={metricsAnim.isVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="bg-entreva-charcoal py-24 lg:py-32" ref={storiesAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              storiesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              What We Do
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-background md:text-4xl">
              Areas of Impact
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {impactStories.map((story, idx) => (
              <div
                key={story.title}
                className={cn(
                  "rounded-2xl border border-background/10 bg-background/5 p-8 transition-all duration-500 hover:bg-background/10",
                  storiesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: storiesAnim.isVisible ? `${(idx + 1) * 100}ms` : "0ms",
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-entreva-green/10 text-sm font-bold text-entreva-green">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-background">
                  {story.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-background/60">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Regions */}
      <section className="bg-background py-24 lg:py-32" ref={regionsAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              regionsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Where We Work
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Focus Regions
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Though we work across all the 16 regions of Ghana, we are more focused on 4 regions to enable us create sustainable impact
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {focusRegions.map((region, idx) => (
              <div
                key={region.name}
                className={cn(
                  "group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-entreva-green/30",
                  regionsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: regionsAnim.isVisible ? `${(idx + 1) * 150}ms` : "0ms",
                }}
              >
                <MapPin className="h-6 w-6 text-entreva-green" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {region.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {region.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-term Vision */}
      <section className="bg-card py-24 lg:py-32" ref={visionAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "mx-auto max-w-3xl text-center transition-all duration-700",
              visionAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Looking Ahead
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Our long-term vision is to be a catalyst for job creation in Ghana
              and Africa
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Through partnerships with governments, development partners, and
              the private sector, we aim to support innovative employment
              creation across African countries, transforming communities and
              building sustainable futures.
            </p>
            <div className="mt-10">
              <Link
                href="/join"
                className="group inline-flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
              >
                Join the Movement
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function MetricItem({
  metric,
  idx,
  isVisible,
}: {
  metric: (typeof impactMetrics)[number]
  idx: number
  isVisible: boolean
}) {
  const count = useCountUp(metric.value, 2000, isVisible)
  const Icon = metric.icon

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 bg-background p-8 text-center transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        transitionDelay: isVisible ? `${(idx + 1) * 100}ms` : "0ms",
      }}
    >
      <Icon className="h-6 w-6 text-entreva-green" />
      <div className="text-3xl font-bold text-foreground">
        <noscript>{metric.value}</noscript>
        {count}
        <span className="text-entreva-green">{metric.suffix}</span>
      </div>
      <p className="text-sm text-muted-foreground">{metric.label}</p>
    </div>
  )
}
