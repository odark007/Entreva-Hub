"use client"

import Link from "next/link"
import { ArrowRight, Briefcase, GraduationCap, Users, MapPin } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { useCountUp } from "@/hooks/use-count-up"
import { cn } from "@/lib/utils"

const metrics = [
  {
    value: 500,
    suffix: "+",
    label: "MSMEs to be Supported",
    description: "Over a 5-year programme span",
    icon: Briefcase,
  },
  {
    value: 20,
    prefix: "%",
    label: "Youth Unemployment",
    description: "The challenge we are solving",
    icon: Users,
  },
  {
    value: 100,
    suffix: "M",
    label: "African Youth at Risk",
    description: "Without jobs in the next 15 years",
    icon: GraduationCap,
  },
  {
    value: 3,
    suffix: "",
    label: "Focus Regions",
    description: "Northern, Upper East, Savannah",
    icon: MapPin,
  },
]

export function ImpactSection() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section className="bg-entreva-charcoal py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "max-w-2xl transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
            Our Impact
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-background md:text-4xl text-balance">
            Driving change across Ghana and Africa
          </h2>
          <p className="mt-4 text-base leading-relaxed text-background/60">
            We are building an ecosystem that empowers entrepreneurs to launch
            and grow businesses, bridging the gap between ideas, skills, and
            market opportunities.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-background/10 bg-background/5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              idx={idx}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mt-12 flex justify-center transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Link
            href="/impact"
            className="group flex items-center gap-2 rounded-lg border border-background/20 px-6 py-3 text-sm font-medium text-background/80 transition-all hover:border-entreva-green hover:text-entreva-green"
          >
            Explore Our Impact
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function MetricCard({
  metric,
  idx,
  isVisible,
}: {
  metric: (typeof metrics)[number]
  idx: number
  isVisible: boolean
}) {
  const count = useCountUp(metric.value, 2000, isVisible)
  const Icon = metric.icon

  return (
    <div
      className={cn(
        "group flex flex-col items-center gap-3 bg-background/5 p-8 text-center backdrop-blur-sm transition-all duration-700 hover:bg-background/10",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        transitionDelay: isVisible ? `${(idx + 1) * 150}ms` : "0ms",
      }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-entreva-green/10 text-entreva-green transition-colors group-hover:bg-entreva-green/20">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-4xl font-bold text-background">
        {metric.prefix && (
          <span className="text-entreva-green">{metric.prefix}</span>
        )}
        <noscript>{metric.value}</noscript>
        {count}
        {metric.suffix && (
          <span className="text-entreva-green">{metric.suffix}</span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-background/80">{metric.label}</p>
        <p className="mt-1 text-xs text-background/40">{metric.description}</p>
      </div>
    </div>
  )
}
