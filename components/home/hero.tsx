"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-entreva-charcoal">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Young African entrepreneurs collaborating in innovation hub"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-entreva-charcoal/60" />
      </div>

      {/* Grid Overlay Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--entreva-green)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--entreva-green)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-32 lg:px-8 lg:pb-32">
        {/* Tag */}
        <div
          className={`mb-8 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-entreva-green/30 bg-entreva-green/10 px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-entreva-green">
            <span className="h-1.5 w-1.5 rounded-full bg-entreva-green animate-pulse" />
            Building Entrepreneurs. Developing Skills. Creating Jobs
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-background sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-700 delay-150 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-balance">
            Building{" "}
            <span className="text-entreva-green">Entrepreneurs</span>.{" "}
            <br className="hidden sm:block" />
            Creating{" "}
            <span className="text-entreva-blue">Jobs</span>.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className={`mt-6 max-w-xl text-lg leading-relaxed text-background/60 transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Entreva Hub empowers individuals, startups, and businesses to create
          sustainable solutions and meaningful employment across Ghana and
          Africa.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col gap-4 sm:flex-row sm:items-center transition-all duration-700 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/about"
            className="group flex items-center justify-center gap-2 rounded-lg bg-entreva-green px-8 py-4 text-sm font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/join"
            className="group flex items-center justify-center gap-2 rounded-lg border border-background/20 px-8 py-4 text-sm font-semibold text-background transition-all hover:border-entreva-green hover:text-entreva-green"
          >
            Join the Hub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Bottom Stats Bar */}
        <div
          className={`mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-background/10 bg-background/5 md:grid-cols-4 transition-all duration-700 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { value: "500+", label: "MSMEs Targeted" },
            { value: "4", label: "Focus Regions" },
            { value: "GHS 3,000+", label: "Jobs to be created" },
            { value: "5 Yr", label: "Programme Span" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 bg-background/5 px-6 py-5 text-center backdrop-blur-sm"
            >
              <span className="text-xl font-bold text-entreva-green sm:text-2xl">
                {stat.value}
              </span>
              <span className="text-xs text-background/50">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-background/20 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-entreva-green" />
        </div>
      </div>
    </section>
  )
}
