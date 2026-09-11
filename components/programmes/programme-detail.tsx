"use client"

import { useEffect, useState } from "react"
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
  Play,
} from "lucide-react"
import type { Programme } from "@/lib/programmes-data"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

function getStatIcon(icon?: string) {
  switch (icon) {
    case "clock":
      return Clock
    case "users":
      return Users
    case "calendar":
      return Calendar
    case "wallet":
      return Wallet
    case "globe":
      return Globe
    case "map-pin":
      return MapPin
    default:
      return Clock
  }
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|shorts\/|v=|embed\/)([\w-]+)/)
  return match ? match[1] : url
}

export function ProgrammeDetail({ programme }: { programme: Programme }) {
  const heroAnim = useAnimateOnScroll()
  const statsAnim = useAnimateOnScroll()
  const contentAnim = useAnimateOnScroll()
  const pillarsAnim = useAnimateOnScroll()
  const facilitatorAnim = useAnimateOnScroll()

  const isFutureForce = programme.slug === "future-force"

  const stats = programme.stats || (isFutureForce ? [
    { label: "Duration", value: "2 Months", icon: "clock" as const },
    { label: "Mentoring", value: "Lifetime", icon: "users" as const },
    { label: "Schedule", value: "July & August", icon: "calendar" as const },
    { label: "Investment", value: programme.price || "Contact Us", icon: "wallet" as const },
    { label: "Delivery", value: "Hybrid Mode", icon: "globe" as const },
    { label: "Location", value: "Community 25", icon: "map-pin" as const },
  ] : [])

  const heroImages = programme.heroImages || []
  const [currentSlide, setCurrentSlide] = useState(0)
  const videoId = programme.introVideo ? getYouTubeId(programme.introVideo.url) : null
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(() => new Set())

  const playVideo = (idx: number) => {
    setPlayingVideos((prev) => {
      const next = new Set(prev)
      next.add(idx)
      return next
    })
  }

  useEffect(() => {
    if (heroImages.length < 2) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [heroImages.length])

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
                <span className="text-xs font-mono text-background/40">{programme.partner}</span>
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl text-balance">
                {programme.title}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-background/70 max-w-2xl">
                {programme.shortDescription}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                {programme.participateUrl && (
                  <Link
                    href={programme.participateUrl}
                    className="group inline-flex items-center gap-2 rounded-xl bg-entreva-green px-8 py-4 font-bold text-entreva-charcoal transition-all hover:scale-105"
                  >
                    Apply
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                )}
                {programme.canRegister !== false && (
                  <Link
                    href={`/programmes/${programme.slug}/register`}
                    className="group inline-flex items-center gap-2 rounded-xl bg-entreva-green px-8 py-4 font-bold text-entreva-charcoal transition-all hover:scale-105"
                  >
                    Secure Your Spot
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </div>

            {heroImages.length > 0 ? (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-entreva-green/30 shadow-2xl bg-card">
                {heroImages.map((src, idx) => (
                  <div
                    key={src}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                      currentSlide === idx
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    )}
                  >
                    <Image
                      src={src}
                      alt={`${programme.title} slide ${idx + 1}`}
                      fill
                      priority={idx === 0}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ))}

                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Show slide ${idx + 1}`}
                      onClick={() => setCurrentSlide(idx)}
                      className={cn(
                        "h-2.5 rounded-full transition-all",
                        currentSlide === idx
                          ? "w-6 bg-entreva-green"
                          : "w-2.5 bg-white/50 hover:bg-white/80"
                      )}
                    />
                  ))}
                </div>
              </div>
            ) : isFutureForce ? (
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
            ) : null}
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS BAR (Logistics) */}
      {stats.length > 0 && (
        <section className="relative z-10 -mt-8 px-6 lg:px-8" ref={statsAnim.ref}>
          <div className={cn(
            "mx-auto max-w-7xl rounded-2xl border border-entreva-green/30 bg-gradient-to-r from-entreva-charcoal/80 to-entreva-charcoal/60 backdrop-blur-xl p-8 shadow-2xl transition-all duration-700",
            statsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className={cn(
              "grid grid-cols-2 gap-y-8 gap-x-4",
              stats.length <= 4 ? "md:grid-cols-4" : "md:grid-cols-3 lg:grid-cols-6"
            )}>
              {stats.map((item, idx) => {
                const IconComponent = getStatIcon(item.icon)
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "space-y-1",
                      idx !== 0 && "border-l border-white/10 pl-4 lg:pl-8",
                      idx % 2 === 0 && "border-l-0 pl-0 md:border-l md:pl-4 lg:pl-8",
                      idx === 0 && "md:border-l-0 md:pl-0 lg:border-l-0 lg:pl-0"
                    )}
                  >
                    <div className="flex items-center gap-2 text-entreva-green">
                      <IconComponent className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-entreva-green">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">{item.value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 3. ABOUT & VISION */}
      <section className="bg-background py-24 lg:py-32" ref={contentAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className={cn("transition-all duration-700", contentAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8")}>
              <h2 className="text-3xl font-bold text-foreground">About {programme.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{programme.overview}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{programme.about}</p>
              
              {programme.vision && (
                <div className="mt-10 rounded-2xl bg-muted p-8 border-l-4 border-entreva-green">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-entreva-green">Purpose</h3>
                  <p className="mt-4 text-xl italic font-medium text-foreground">"{programme.vision}"</p>
                </div>
              )}
            </div>

            {programme.objectives && programme.objectives.length > 0 && (
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
            )}
          </div>
        </div>
      </section>

      {/* 3b. WELCOME VIDEO */}
      {programme.introVideo && videoId && (
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{programme.introVideo.title}</h2>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border bg-entreva-charcoal shadow-2xl aspect-video">
              {videoPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={programme.introVideo.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setVideoPlaying(true)}
                  aria-label={`Play ${programme.introVideo.title}`}
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                    alt={programme.introVideo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 896px"
                  />
                  <span className="absolute inset-0 bg-entreva-charcoal/40 transition-colors duration-300 group-hover:bg-entreva-charcoal/25" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-entreva-green text-entreva-charcoal shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-9 w-9 fill-current" />
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. THE CURRICULUM (PILLARS) */}
      {programme.pillars && programme.pillars.length > 0 && (
        <section className="bg-card py-24 lg:py-32" ref={pillarsAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{programme.title} Curriculum</h2>
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
      )}

      {/* 4c. TESTIMONIALS */}
      {programme.testimonials && programme.testimonials.videos.length > 0 && (
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{programme.testimonials.title}</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {programme.testimonials.videos.map((url, idx) => {
                const id = getYouTubeId(url)
                const playing = playingVideos.has(idx)
                return (
                  <div
                    key={url}
                    className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-entreva-charcoal shadow-2xl"
                  >
                    {playing ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                        title={`${programme.testimonials!.title} ${idx + 1}`}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => playVideo(idx)}
                        aria-label={`Play ${programme.testimonials!.title} ${idx + 1}`}
                        className="group absolute inset-0 h-full w-full cursor-pointer"
                      >
                        <Image
                          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                          alt={`${programme.testimonials!.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                        <span className="absolute inset-0 bg-entreva-charcoal/40 transition-colors duration-300 group-hover:bg-entreva-charcoal/25" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-entreva-green text-entreva-charcoal shadow-xl transition-transform duration-300 group-hover:scale-110">
                            <Play className="h-7 w-7 fill-current" />
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4b. PROGRAM STRUCTURE */}
      {programme.structure && programme.structure.length > 0 && (
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16 text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
                How It Works
              </span>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">Program Structure</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                A week-by-week breakdown of the hands-on training journey.
              </p>
            </div>

            <div className="space-y-20 lg:space-y-24">
              {programme.structure.map((section, idx) => (
                <div
                  key={section.title}
                  className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={cn("relative aspect-[16/11] overflow-hidden rounded-2xl shadow-xl border border-border", idx % 2 === 1 && "lg:order-2")}>
                    <Image
                      src={section.image || "/placeholder.svg"}
                      alt={section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className={cn(idx % 2 === 1 && "lg:order-1")}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-entreva-green/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-entreva-green">
                      {section.week}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
                      {section.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. FACILITATORS SLIDER */}
      {programme.facilitators && programme.facilitators.length > 0 && (
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
      )}

      {/* 6. OUTCOMES & PERKS */}
      {(programme.outcomes && programme.outcomes.length > 0) || (programme.perks && programme.perks.length > 0) ? (
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Outcomes */}
              {programme.outcomes && programme.outcomes.length > 0 && (
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
              )}

              {/* Perks / The Package */}
              {programme.perks && programme.perks.length > 0 && (
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
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* 7. FAQ */}
      {programme.faqs && programme.faqs.length > 0 && (
        <section className="bg-card py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
                Got Questions?
              </span>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion
              type="single"
              collapsible
              className="mx-auto max-w-3xl rounded-2xl border bg-background px-6 shadow-sm"
            >
              {programme.faqs.map((faq, idx) => (
                <AccordionItem key={faq.question} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* 8. WHO SHOULD APPLY */}
      {programme.applySection && (
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
                  Eligibility
                </span>
                <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                  Who Should Apply?
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {programme.applySection.intro}
                </p>

                <h3 className="mt-10 text-lg font-bold text-foreground">
                  You should apply if you are:
                </h3>
                <ul className="mt-6 grid gap-4">
                  {programme.applySection.criteria.map((criterion) => (
                    <li key={criterion} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-entreva-green" />
                      <span className="font-medium text-muted-foreground">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-entreva-charcoal p-8 text-white shadow-2xl lg:p-12">
                <h3 className="text-2xl font-bold text-entreva-green">
                  {programme.applySection.commitment.title}
                </h3>
                <div className="mt-8 space-y-8">
                  {programme.applySection.commitment.items.map((item) => (
                    <div key={item.label} className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-background/40">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}