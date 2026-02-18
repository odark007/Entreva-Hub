"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/impact", label: "Impact" },
  { href: "/team", label: "Team" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-entreva-charcoal/95 backdrop-blur-md border-b border-foreground/5"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/entreva-hub-logo-2-2.png"
            alt="Entreva Hub"
            width={160}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
                pathname === link.href
                  ? "text-entreva-green"
                  : "text-background/70 hover:text-background"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-entreva-green" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://wa.me/233243521917"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-background/70 transition-colors hover:text-entreva-green"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="sr-only">WhatsApp</span>
          </a>
          <a
            href="tel:+233243521917"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-background/70 transition-colors hover:text-entreva-green"
          >
            <Phone className="h-4 w-4" />
            <span className="sr-only">Call us</span>
          </a>
          <Button asChild className="bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 font-semibold">
            <Link href="/join">Join the Hub</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-background lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 lg:hidden",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-entreva-charcoal/98 backdrop-blur-md border-t border-foreground/5 px-6 pb-6 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-4 py-3 text-base font-medium transition-colors",
                pathname === link.href
                  ? "text-entreva-green bg-entreva-green/5"
                  : "text-background/70 hover:text-background"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <Button asChild className="w-full bg-entreva-green text-entreva-charcoal hover:bg-entreva-green/90 font-semibold">
              <Link href="/join">Join the Hub</Link>
            </Button>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://wa.me/233243521917"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-background/60 hover:text-entreva-green transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="tel:+233243521917"
                className="flex items-center gap-2 text-sm text-background/60 hover:text-entreva-green transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
