"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Linkedin, ArrowRight } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const leadership = [
  {
    name: "Christian Tetteh Agbasi",
    role: "Co-Founder & Executive Director",
    image: "/images/Co-Founder-Executive-Director-square_III.jpg",
    bio: [
      "Christian Tetteh Agbasi is the Co-Founder and Executive Director for Entreva Hub. He is a leadership development/capacity building specialist, and entrepreneur. He has undertaken training and consulting projects in Ghana, Kenya, Nigeria, and Ivory Coast for startups, small, medium and global multinationals both in the public and private sector. He founded Oakleaf Training and Consulting in 2013 and has worked as Soft Skills Trainer, Learning and Development Manager, Capacity Building Consultant for a number of international organizations in Ghana. He is an Associate of Hemsley Fraser - a global training company in the UK.",
      "He has passion for youth development, skills development and job creation and is constantly thinking of systems and models to expand job opportunities for women and youth. Christian works on a number youth development projects including having trained 15,000+ Ghanaian youth in Digital Skills on the Google Digital Skills for Africa program. He also trained 100+ young women in tech for an employability program sponsored by GIZ.",
      "He holds MBA from SMU, India and BA Psychology and Information Studies from University of Ghana. He also has a certificate in Training & Development Management from University of Cape Town, South Africa and a Certified Trainer/Facilitator from Len Stevens Training, South Africa.",
    ],
    linkedin: "https://www.linkedin.com/in/christian-tetteh-agbasi-19b06744/",
  }
]

const team = [
  {
    name: "Christian Tetteh Agbasi",
    role: "Co-Founder & Executive Director",
    image: "/images/Co-Founder-Executive-Director-square_III.jpg",
    bio: 
      "Christian Tetteh Agbasi is the Co-Founder and Executive Director for Entreva Hub. He is a leadership development/capacity building specialist, and entrepreneur. He has undertaken training and consulting projects in Ghana, Kenya, Nigeria, and Ivory Coast for startups, small, medium and global multinationals both in the public and private sector. He founded Oakleaf Training and Consulting in 2013 and has worked as Soft Skills Trainer, Learning and Development Manager, Capacity Building Consultant for a number of international organizations in Ghana. He is an Associate of Hemsley Fraser - a global training company in the UK. He has passion for youth development, skills development and job creation and is constantly thinking of systems and models to expand job opportunities for women and youth. Christian works on a number youth development projects including having trained 15,000+ Ghanaian youth in Digital Skills on the Google Digital Skills for Africa program. He also trained 100+ young women in tech for an employability program sponsored by GIZ. He holds MBA from SMU, India and BA Psychology and Information Studies from University of Ghana. He also has a certificate in Training & Development Management from University of Cape Town, South Africa and a Certified Trainer/Facilitator from Len Stevens Training, South Africa.",
    linkedin: "https://www.linkedin.com/in/christian-tetteh-agbasi-19b06744/",
  },
  {
    name: "Enoch Yirenkyi",
    role: "Project Officer – Agric",
    image: "/images/enoch-yirenkyi-enoch_square.jpg",
    bio: "Enoch is the Project Officer – Agri at Entreva Hub. He is an agricultural professional focused on sustainable agriculture and empowerment, with experience supporting youth-centered initiatives, value addition, and agribusiness development. He is committed to designing innovative programs that ensures steady growth of Entreva Hub. He holds a BSc in Agriculture.",
    linkedin: "https://www.linkedin.com/in/enoch-asiedu-yirenkyi-a756361b6/",
  },
  {
    name: "Godwin France",
    role: "Project Officer – Tech",
    image: "/images/Godwin-France.jpeg",
    bio: "Godwin France is Project Officer – Tech at Entreva Hub. He is a technologist and STEAM advocate with extensive experience in using technology for education, entrepreneurship, and workforce development. Over the years, he has trained young people, entrepreneurs, and professionals across a number of African countries, equipping them with practical digital skills and guiding them through emerging trends in technology. With a strong background in IT systems, digital tools, and innovation-driven learning, he brings both strategic insight and hands-on expertise to every initiative. At Entreva Hub, he leads all technology and IT-related training and projects, supporting entrepreneurs and job seekers with the technical competencies needed to thrive in today’s digital economy. Holds a BSc. in Telecommunication Engineering. ",
    linkedin: "https://www.linkedin.com/in/godwin-france/",
  },
]

/*
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
*/

export function TeamContent() {
  const [expandedTeamMembers, setExpandedTeamMembers] = useState<Record<string, boolean>>({})

  const heroAnim = useAnimateOnScroll()
  const leadershipAnim = useAnimateOnScroll()
  const teamAnim = useAnimateOnScroll()
  // const advisorsAnim = useAnimateOnScroll()
  const ctaAnim = useAnimateOnScroll()

  const getBioPreview = (bio: string, maxLength = 180) => {
    const paragraphs = bio.split(/\n\s*\n/)
    if (paragraphs.length > 1) {
      return paragraphs[0]
    }

    if (bio.length <= maxLength) {
      return bio
    }

    const truncated = bio.slice(0, maxLength)
    const lastSpace = truncated.lastIndexOf(" ")
    return `${truncated.slice(0, lastSpace)}...`
  }

  const toggleTeamMember = (name: string) => {
    setExpandedTeamMembers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const showLeadershipSection = false

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
              A passionate team of entrepreneurs, innovators, and change-makers
              dedicated to creating meaningful employment and economic
              opportunity across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      {showLeadershipSection && (
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
                    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                      {person.bio.map((paragraph, paragraphIdx) => (
                        <p key={`${person.name}-paragraph-${paragraphIdx}`}>{paragraph}</p>
                      ))}
                    </div>
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
      )}

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
                  {(() => {
                    const isExpanded = expandedTeamMembers[person.name]
                    const preview = getBioPreview(person.bio)
                    const hasMore = preview.length < person.bio.length

                    return (
                      <>
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                          {isExpanded ? person.bio : preview}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                          {hasMore && (
                            <button
                              type="button"
                              onClick={() => toggleTeamMember(person.name)}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-entreva-green"
                            >
                              {isExpanded ? "Read less" : "Read more"}
                            </button>
                          )}
                          <a
                            href={person.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-entreva-green"
                            aria-label={`${person.name} on LinkedIn`}
                          >
                            <Linkedin className="h-3.5 w-3.5" />
                            LinkedIn
                          </a>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
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
      */}

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
