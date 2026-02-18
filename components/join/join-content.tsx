"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Handshake,
  Building2,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const joinPaths = [
  {
    icon: Briefcase,
    title: "Entrepreneur / Startup",
    description:
      "Apply to our programmes, access training, mentorship, and funding to grow your business.",
    cta: "View Programmes",
    href: "/programmes",
  },
  {
    icon: Handshake,
    title: "Partner / Sponsor",
    description:
      "Collaborate with us to drive impact at scale. We work with governments, corporates, and development agencies.",
    cta: "Partner With Us",
    href: "#contact",
  },
  {
    icon: GraduationCap,
    title: "Mentor / Coach",
    description:
      "Share your expertise with the next generation of African entrepreneurs. Join our mentor network.",
    cta: "Become a Mentor",
    href: "#contact",
  },
  {
    icon: Building2,
    title: "Job seeker",
    description:
      "Gain practical measurable skills through our employability training program and job search coaching.",
    cta: "Get Involved",
    href: "#contact",
  },
]

const benefits = [
  "Access to world-class training and business development support",
  "Expert mentorship and business coaching",
  "Funding opportunities",
  "Market access through exhibitions and trade shows",
  "A community of like-minded entrepreneurs and innovators",
  "Networking with industry leaders and partners",
]

export function JoinContent() {
  const heroAnim = useAnimateOnScroll()
  const pathsAnim = useAnimateOnScroll()
  const benefitsAnim = useAnimateOnScroll()
  const contactAnim = useAnimateOnScroll()
  const [formState, setFormState] = useState<"idle" | "submitting" | "submitted">("idle")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState("submitting")
    setTimeout(() => {
      setFormState("submitted")
    }, 1500)
  }

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
              Join the Hub
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-background md:text-5xl lg:text-6xl text-balance">
              Be part of the movement creating jobs in Africa
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-background/60">
              Whether you are an entrepreneur, partner, mentor, or someone who
              wants to make a difference, there is a place for you at Entreva
              Hub.
            </p>
          </div>
        </div>
      </section>

      {/* Paths */}
      <section className="bg-background py-24 lg:py-32" ref={pathsAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={cn(
              "transition-all duration-700",
              pathsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
              How to Get Involved
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Choose your path
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {joinPaths.map((path, idx) => {
              const Icon = path.icon
              return (
                <Link
                  key={path.title}
                  href={path.href}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-entreva-green/30 hover:bg-card/80",
                    pathsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: pathsAnim.isVisible ? `${(idx + 1) * 100}ms` : "0ms",
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-entreva-green/10 text-entreva-green transition-colors group-hover:bg-entreva-green group-hover:text-entreva-charcoal">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {path.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-entreva-green transition-all group-hover:gap-3">
                    {path.cta}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-entreva-charcoal py-24 lg:py-32" ref={benefitsAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div
              className={cn(
                "transition-all duration-700",
                benefitsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
                Why Entreva Hub
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-background md:text-4xl text-balance">
                What you get when you join
              </h2>
              <p className="mt-4 text-base leading-relaxed text-background/60">
                Our programmes are designed to give you everything you need to
                launch, grow, and scale a sustainable business.
              </p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-4 transition-all duration-700 delay-200",
                benefitsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {benefits.map((benefit, idx) => (
                <div
                  key={benefit}
                  className={cn(
                    "flex items-start gap-4 rounded-xl border border-background/10 bg-background/5 p-5 transition-all duration-500",
                    benefitsAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  )}
                  style={{
                    transitionDelay: benefitsAnim.isVisible ? `${(idx + 1) * 80}ms` : "0ms",
                  }}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-entreva-green" />
                  <p className="text-sm leading-relaxed text-background/80">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-background py-24 lg:py-32" id="contact" ref={contactAnim.ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left - Info */}
            <div
              className={cn(
                "transition-all duration-700",
                contactAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
                Get in Touch
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Ready to start your journey?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Fill out the form and our team will reach out to you within 48
                hours. You can also reach us directly through the channels
                below.
              </p>
              <div className="mt-10 flex flex-col gap-6">
                <a
                  href="tel:+233243521917"
                  className="flex items-center gap-4 text-sm text-foreground transition-colors hover:text-entreva-green"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-entreva-green/10 text-entreva-green">
                    <Phone className="h-5 w-5" />
                  </div>
                  +233 24 352 1917
                </a>
                <a
                  href="https://wa.me/233243521917"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-sm text-foreground transition-colors hover:text-entreva-green"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-entreva-green/10 text-entreva-green">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  WhatsApp Us
                </a>
                <a
                  href="mailto:info@entrevahub.com"
                  className="flex items-center gap-4 text-sm text-foreground transition-colors hover:text-entreva-green"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-entreva-green/10 text-entreva-green">
                    <Mail className="h-5 w-5" />
                  </div>
                  info@entrevahub.com
                </a>
                <div className="flex items-center gap-4 text-sm text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-entreva-green/10 text-entreva-green">
                    <MapPin className="h-5 w-5" />
                  </div>
                  No. 9 Goa Street, TDC Estates, Community 25, Tema, Ghana.
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div
              className={cn(
                "transition-all duration-700 delay-200",
                contactAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {formState === "submitted" ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-entreva-green/20 bg-entreva-green/5 p-12 text-center">
                  <CheckCircle2 className="h-16 w-16 text-entreva-green" />
                  <h3 className="mt-6 text-2xl font-bold text-foreground">Thank you!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We have received your message and will get back to you
                    within 48 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-entreva-green focus:ring-1 focus:ring-entreva-green"
                          placeholder="Kofi"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-entreva-green focus:ring-1 focus:ring-entreva-green"
                          placeholder="Mensah"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-entreva-green focus:ring-1 focus:ring-entreva-green"
                        placeholder="kofi@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="interest"
                        className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground"
                      >
                        I am interested as a...
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        required
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-entreva-green focus:ring-1 focus:ring-entreva-green"
                      >
                        <option value="">Select an option</option>
                        <option value="entrepreneur">Entrepreneur / Startup</option>
                        <option value="partner">Partner / Sponsor</option>
                        <option value="mentor">Mentor / Coach</option>
                        <option value="job-seeker">Job seeker</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-xs font-mono uppercase tracking-wider text-muted-foreground"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-entreva-green focus:ring-1 focus:ring-entreva-green"
                        placeholder="Tell us a bit about yourself and what you're looking for..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full bg-entreva-green py-6 text-sm font-semibold text-entreva-charcoal hover:bg-entreva-green/90 disabled:opacity-60"
                    >
                      {formState === "submitting" ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-entreva-charcoal/30 border-t-entreva-charcoal" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
