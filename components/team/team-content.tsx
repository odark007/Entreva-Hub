"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin, ArrowRight } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const leadership = [
  {
    name: "Michael Asante",
    role: "Founder & CEO",
    image: "/images/team-ceo.jpg",
    bio: "A visionary entrepreneur with over 10 years of experience in business development and innovation ecosystems across Africa. Michael founded Entreva Hub to bridge the gap between entrepreneurial talent and economic opportunity.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Abena Owusu",
    role: "Chief Operating Officer",
    image: "/images/team-coo.jpg",
    bio: "Abena brings expertise in programme management and operations, having led entrepreneurship initiatives across West Africa. She ensures Entreva Hub delivers impactful programmes at scale.",
    linkedin: "https://linkedin.com",
  },
]

const team = [
  {
    name: "Kwame Mensah",
    role: "Head of Programmes",
    image: "/images/team-programs.jpg",
    bio: "Kwame designs and manages programme curricula, ensuring entrepreneurs receive world-class training and mentorship.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Esi Boateng",
    role: "Communications Lead",
    image: "/images/team-comms.jpg",
    bio: "Esi drives brand storytelling and community engagement, amplifying the stories of impact across Entreva's ecosystem.",
    linkedin: "https://linkedin.com",
  },
]

const advisors = [
  {
    name: "Dr. Nana Adjei",
    role: "Strategy Advisor",
    organization: "Ghana Enterprise Agency",
  },
  {
    name: "Prof. Akosua Dufie",
    role: "Academic Advisor",
    organization: "University of Ghana Business School",
  },
  {
    name: "Isaac Osei-Bonsu",
    role: "Technology Advisor",
    organization: "Meltwater Entrepreneurial School of Technology",
  },
]

export function TeamContent() {
  const heroAnim = useAnimateOnScroll()
  const leadershipAnim = useAnimateOnScroll()
  const teamAnim = useAnimateOnScroll()
  const advisorsAnim = useAnimateOnScroll()
  const ctaAnim = useAnimateOnScroll()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-entreva-charcoal pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--entreva-green)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--entreva-green)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8" ref={heroAnim.ref}>
          <div
            className={cn(
              "max-w-3xl transition-all duration-700",
              heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Our Team
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-background md:text-5xl lg:text-6xl text-balance">
              The people building the future of work in Africa
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-background/60">
              A passionate team of entrepreneurs, operators, and change-makers
              dedicated to creating meaningful employment and economic
              opportunity across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-background py-24 lg:py-32" ref={leadershipAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              leadershipAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Leadership
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Meet our leaders
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {leadership.map((person, idx) => (
              <div
                key={person.name}
                className={cn(
                  "group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-entreva-green/30",
                  leadershipAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: leadershipAnim.isVisible ? `${(idx + 1) * 150}ms` : "0ms",
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={person.image || "/placeholder.svg"}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-entreva-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-background">{person.name}</h3>
                    <p className="mt-1 text-sm font-mono text-entreva-green">{person.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-entreva-blue transition-colors hover:text-entreva-green"
                    aria-label={`${person.name} on LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="bg-card py-24 lg:py-32" ref={teamAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              teamAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Core Team
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              The team behind the mission
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...team].map((person, idx) => (
              <div
                key={person.name}
                className={cn(
                  "group overflow-hidden rounded-2xl border border-border bg-background transition-all duration-500 hover:border-entreva-green/30",
                  teamAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: teamAnim.isVisible ? `${(idx + 1) * 100}ms` : "0ms",
                }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={person.image || "/placeholder.svg"}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-foreground">{person.name}</h3>
                  <p className="mt-0.5 text-xs font-mono text-entreva-green">{person.role}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {person.bio}
                  </p>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-entreva-green"
                    aria-label={`${person.name} on LinkedIn`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="bg-entreva-charcoal py-24 lg:py-32" ref={advisorsAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              advisorsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Advisory Board
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-background md:text-4xl">
              Guided by experience
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-background/60">
              Our advisory board brings decades of collective experience in
              business, academia, and technology.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {advisors.map((advisor, idx) => (
              <div
                key={advisor.name}
                className={cn(
                  "rounded-2xl border border-background/10 bg-background/5 p-8 transition-all duration-500 hover:bg-background/10",
                  advisorsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: advisorsAnim.isVisible ? `${(idx + 1) * 100}ms` : "0ms",
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-entreva-green/10 text-lg font-bold text-entreva-green">
                  {advisor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-background">{advisor.name}</h3>
                <p className="mt-1 text-sm font-mono text-entreva-green">{advisor.role}</p>
                <p className="mt-2 text-sm text-background/50">{advisor.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-background py-24 lg:py-32" ref={ctaAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "mx-auto max-w-3xl text-center transition-all duration-700",
              ctaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              Join Us
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Want to be part of the team building the future?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We are always looking for passionate, driven individuals who share
              our vision for creating meaningful employment across Africa.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/join"
                className="group inline-flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
              >
                Join the Hub
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="mailto:careers@entrevahub.com"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-4 font-semibold text-foreground transition-all hover:border-entreva-green hover:text-entreva-green"
              >
                View Open Roles
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
