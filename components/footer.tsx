import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ArrowUpRight,
} from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programmes", label: "Programmes" },
  { href: "/impact", label: "Impact" },
  { href: "/team", label: "Team" },
  { href: "/join", label: "Join the Hub" },
]

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const socialLinks = [
  { href: "https://www.linkedin.com/company/entreva-hub-job-creation/posts/?feedView=all", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.facebook.com/share/17qMW7DHV5nkEnxH8", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://www.youtube.com/channel/UCLlvU5BZYq5IHew2-Y2RiUw", icon: Youtube, label: "YouTube" },
  { href: "https://vt.tiktok.com/ZSCwVr2na/", icon: TiktokIcon, label: "TikTok" },
]

export interface FooterProps {
  cta?: {
    title?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
    stacked?: boolean
  }
}

export function Footer({ cta }: FooterProps = {}) {
  const ctaTitle = cta?.title || "Ready to make an impact?"
  const ctaDescription = cta?.description || "Join Entreva Hub and be part of the change."
  const ctaButtonText = cta?.buttonText || "Join the Hub"
  const ctaButtonUrl = cta?.buttonUrl || "/join"

  return (
    <footer className="bg-entreva-charcoal text-background">
      {/* Top CTA Band */}
      <div className="border-b border-background/10">
        <div
          className={cn(
            "mx-auto max-w-7xl px-6 py-12 lg:px-8",
            cta?.stacked
              ? "flex flex-col items-center text-center gap-6"
              : "flex flex-col items-center justify-between gap-6 md:flex-row"
          )}
        >
          <div className={cn(cta?.stacked && "max-w-2xl text-center")}>
            <h3 className="text-2xl font-bold text-background md:text-3xl">
              {ctaTitle}
            </h3>
            <p className="mt-1 text-background/60">
              {ctaDescription}
            </p>
          </div>
          <Link
            href={ctaButtonUrl}
            className="group inline-flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
          >
            {ctaButtonText}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Image
                src="/entreva-hub-logo-2-2.png"
                alt="Entreva Hub"
                width={160}
                height={40}
                priority
                className="h-9 w-auto"
              />
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-background/60">
              Entreva Hub is an entrepreneurship and innovation hub dedicated to
              empowering individuals, startups, and businesses to create
              sustainable solutions and meaningful employment in Ghana and
              Africa.
            </p>
            <p className="mt-4 text-xs font-mono uppercase tracking-wider text-entreva-green">
              Developing Skills. Building Entrepreneurs. Creating Jobs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-background/40">
              Navigation
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 transition-colors hover:text-entreva-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-background/40">
              Get in Touch
            </h4>
            <ul className="mt-4 flex flex-col gap-4">
              <li>
                <a
                  href="tel:+233548493880"
                  className="flex items-center gap-3 text-sm text-background/60 transition-colors hover:text-entreva-green"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +233 54 849 3880
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/233548493880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-background/60 transition-colors hover:text-entreva-green"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@entrevahub.com"
                  className="flex items-center gap-3 text-sm text-background/60 transition-colors hover:text-entreva-green"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  info@entrevahub.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/71WBNoLVV5nkEnxH8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-background/60 transition-colors hover:text-entreva-green"
                >
                  <MapPin className="h-4 w-4 shrink-0" />
                  Click here for Google map directions
                </a>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-background/5 text-background/40 transition-all hover:bg-entreva-green hover:text-entreva-charcoal"
                  aria-label={social.label}
                  suppressHydrationWarning
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-background/40 md:flex-row lg:px-8">
          <p>{"© 2025 Entreva Hub. All Rights Reserved."}</p>
          <p>
            <a
              href="https://saharansub.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-entreva-green transition-colors"
            >
              Design by Saharansub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
