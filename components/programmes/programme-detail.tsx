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
  Clock,
  Wallet,
  Globe,
  Star,
  ChevronRight,
} from "lucide-react"
import type { Programme } from "@/lib/programmes-data"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

export function ProgrammeDetail({ programme }: { programme: Programme }) {
  const heroAnim = useAnimateOnScroll()
  const statsAnim = useAnimateOnScroll()
  const contentAnim = useAnimateOnScroll()
  const pillarsAnim = useAnimateOnScroll()
  const facilitatorAnim = useAnimateOnScroll()

  const isFutureForce = programme.slug === "future-force"

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative bg-entreva-charcoal pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={programme.image || "/placeholder.svg"}
            alt={programme.title}
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-entreva-charcoal/60 via-entreva-charcoal/90 to-entreva-charcoal" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={heroAnim.ref}>
          <Link
            href="/programmes"
            className="mb-8 inline-flex items-center gap-2 text-sm text-background/60 transition-colors hover:text-entreva-green"
          >
            <ArrowLeft className="h-4 w-4" />
            All Programmes
          </Link>
          
          <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000", heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="rounded-full bg-entreva-green px-4 py-1 text-xs font-bold uppercase tracking-widest text-entreva-charcoal">
                  {programme.status}
                </span>
                <span className="text-xs font-mono text-background/40">Partner: {programme.partner}</span>
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl text-balance">
                {programme.title}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-background/70 max-w-2xl">
                {programme.shortDescription}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={`/programmes/${programme.slug}/register`}
                  className="group inline-flex items-center gap-2 rounded-xl bg-entreva-green px-8 py-4 font-bold text-entreva-charcoal transition-all hover:scale-105"
                >
                  Secure Your Spot
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {isFutureForce && (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-entreva-green/30 shadow-2xl">
                <Image
                  src="/images/future-froce-entreva-hub.jpg"
                  alt="Future Force Program"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS BAR (Logistics) */}
      <section className="relative z-10 -mt-8 px-6 lg:px-8" ref={statsAnim.ref}>
        <div className={cn(
          "mx-auto max-w-7xl rounded-2xl border border-entreva-green/30 bg-gradient-to-r from-entreva-charcoal/80 to-entreva-charcoal/60 backdrop-blur-xl p-8 shadow-2xl transition-all duration-700",
          statsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-entreva-green">
                <Clock className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-entreva-green">Duration</span>
              </div>
              <p className="text-lg font-bold text-white">2 Months</p>
            </div>
            <div className="space-y-1 border-l border-white/10 pl-8">
              <div className="flex items-center gap-2 text-entreva-green">
                <Calendar className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-entreva-green">Schedule</span>
              </div>
              <p className="text-lg font-bold text-white">July & August</p>
            </div>
            <div className="space-y-1 border-l border-white/10 pl-8">
              <div className="flex items-center gap-2 text-entreva-green">
                <Wallet className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-entreva-green">Investment</span>
              </div>
              <p className="text-lg font-bold text-white">{programme.price || "Contact Us"}</p>
            </div>
            <div className="space-y-1 border-l border-white/10 pl-8">
              <div className="flex items-center gap-2 text-entreva-green">
                <Globe className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-entreva-green">Delivery</span>
              </div>
              <p className="text-lg font-bold text-white">Hybrid Mode</p>
            </div>
            <div className="space-y-1 border-l border-white/10 pl-8">
              <div className="flex items-center gap-2 text-entreva-green">
                <MapPin className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-entreva-green">Location</span>
              </div>
              <p className="text-lg font-bold text-white">Community 25</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT & VISION */}
      <section className="bg-background py-24 lg:py-32" ref={contentAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className={cn("transition-all duration-700", contentAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8")}>
              <h2 className="text-3xl font-bold text-foreground">Bridging the Gap</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{programme.overview}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{programme.about}</p>
              
              {programme.vision && (
                <div className="mt-10 rounded-2xl bg-muted p-8 border-l-4 border-entreva-green">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-entreva-green">Purpose</h3>
                  <p className="mt-4 text-xl italic font-medium text-foreground">"{programme.vision}"</p>
                </div>
              )}
            </div>

            <div className={cn("space-y-8 transition-all duration-700 delay-200", contentAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8")}>
              <h3 className="text-2xl font-bold text-foreground">Key Objectives</h3>
              <ul className="grid gap-4">
                {programme.objectives?.map((obj) => (
                  <li key={obj} className="flex items-start gap-4 rounded-xl border p-4 hover:border-entreva-green/50 transition-colors">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-entreva-green" />
                    <span className="font-medium text-muted-foreground">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE CURRICULUM (PILLARS) */}
      <section className="bg-card py-24 lg:py-32" ref={pillarsAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">The Future Force Curriculum</h2>
            <p className="mt-4 text-muted-foreground">Comprehensive practical training and workshops across four core domains of skills for the future.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {programme.pillars?.map((pillar, idx) => (
              <div 
                key={pillar.title} 
                className={cn(
                  "rounded-2xl border bg-background p-6 transition-all duration-500",
                  pillarsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-entreva-green/10 text-entreva-green font-bold">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">{pillar.title}</h3>
                <ul className="space-y-3">
                  {pillar.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-3 w-3 text-entreva-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FACILITATORS SLIDER */}
      <section className="bg-entreva-charcoal py-24 lg:py-32" ref={facilitatorAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Meet Your Facilitators</h2>
              <p className="mt-4 text-background/60">Learn from a diverse team of professionals dedicated to your personal and career growth.</p>
            </div>
            <div className="flex gap-2">
               {/* Arrows could be added here if using a full carousel library */}
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-thin scrollbar-thumb-entreva-green scrollbar-track-charcoal">
            {programme.facilitators?.map((fac, idx) => (
              <div 
                key={fac.name} 
                className="min-w-[300px] md:min-w-[350px] snap-start rounded-2xl bg-white/5 border border-white/10 p-6 transition-all hover:bg-white/10"
              >
                <div className="relative mb-6 h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={fac.image || "/images/team-placeholder.jpg"}
                    alt={fac.name}
                    fill
                    className="object-cover transition-transform hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{fac.name}</h3>
                <p className="text-sm font-bold text-entreva-green uppercase tracking-widest mt-1">{fac.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-background/60 line-clamp-3">
                  {fac.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUTCOMES & PERKS */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Outcomes */}
            <div className="rounded-3xl border bg-card p-8 lg:p-12 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-8">Expected Outcomes</h2>
              <div className="grid gap-6">
                {programme.outcomes?.map((outcome) => (
                  <div key={outcome} className="flex gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-entreva-green text-entreva-charcoal">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-muted-foreground font-medium">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Perks / The Package */}
            <div className="rounded-3xl bg-entreva-charcoal p-8 lg:p-12 text-white shadow-2xl">
              <h2 className="text-2xl font-bold mb-8 text-entreva-green">The FFP Package</h2>
              <p className="mb-8 text-background/60">The GHS 3,550 participation fee is a comprehensive investment that includes:</p>
              <div className="grid gap-4">
                {programme.perks?.map((perk) => (
                  <div key={perk} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <Star className="h-5 w-5 text-entreva-green" />
                    <span className="font-bold">{perk}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link
                  href={`/programmes/${programme.slug}/register`}
                  className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-entreva-green px-8 py-5 font-black text-lg text-entreva-charcoal transition-all hover:bg-white"
                >
                  Apply to Join the Next Cohort
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <p className="mt-4 text-xs text-background/40">Limited to 30 participants only. Installments available.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}