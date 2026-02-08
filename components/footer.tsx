import Link from "next/link"
import {
  Linkedin,
  Facebook,
  Instagram,
  Phone,
  Mail,
  MessageCircle,
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

const socialLinks = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-entreva-charcoal text-background">
      {/* Top CTA Band */}
      <div className="border-b border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row lg:px-8">
          <div>
            <h3 className="text-2xl font-bold text-background md:text-3xl">
              Ready to make an impact?
            </h3>
            <p className="mt-1 text-background/60">
              Join Entreva Hub and be part of the change.
            </p>
          </div>
          <Link
            href="/join"
            className="group flex items-center gap-2 rounded-lg bg-entreva-green px-8 py-4 font-semibold text-entreva-charcoal transition-all hover:bg-entreva-green/90"
          >
            Join the Hub
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
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-entreva-green">
                <span className="text-base font-bold text-entreva-charcoal">E</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-background">
                  ENTREVA
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-entreva-green">
                  Hub
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-background/60">
              Entreva Hub is an entrepreneurship and innovation hub dedicated to
              empowering individuals, startups, and businesses to create
              sustainable solutions and meaningful employment in Ghana and
              Africa.
            </p>
            <p className="mt-4 text-xs font-mono uppercase tracking-wider text-entreva-green">
              Fueling Innovation. Building Entrepreneurs. Creating Jobs.
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
                  href="tel:+233243521917"
                  className="flex items-center gap-3 text-sm text-background/60 transition-colors hover:text-entreva-green"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +233 24 352 1917
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/233243521917"
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
            Danneskiold-Samsoes Alle 41, 1434 Copenhagen, Denmark
          </p>
        </div>
      </div>
    </footer>
  )
}
