"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "Entreva Hub gave me the skills and confidence to turn my farming idea into a real business. The mentorship was invaluable.",
    name: "Ama Mensah",
    role: "Agribusiness Entrepreneur",
  },
  {
    quote:
      "Through the MTN SME Support Programme, I received training and funding that helped me scale my business to three new regions.",
    name: "Kwame Asante",
    role: "Tech Startup Founder",
  },
  {
    quote:
      "The community at Entreva Hub is incredible. Connecting with other entrepreneurs changed the trajectory of my career.",
    name: "Abena Osei",
    role: "Social Enterprise Leader",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const { ref, isVisible } = useAnimateOnScroll()

  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="bg-card py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-xs font-mono uppercase tracking-wider text-entreva-green">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What Our Founders Say
          </h2>
        </div>

        <div
          className={cn(
            "mt-16 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="relative mx-auto max-w-3xl">
            {/* Quote Icon */}
            <Quote className="mb-6 h-10 w-10 text-entreva-green/30" />

            {/* Quote */}
            <div className="min-h-[140px]">
              <blockquote
                key={current}
                className="text-xl font-medium leading-relaxed text-foreground md:text-2xl animate-fade-in"
              >
                {`"${testimonials[current].quote}"`}
              </blockquote>
            </div>

            {/* Attribution */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-entreva-green/10">
                <span className="text-lg font-bold text-entreva-green">
                  {testimonials[current].name[0]}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[current].role}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-entreva-green hover:text-entreva-green"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={`dot-${testimonials[idx].name}`}
                    type="button"
                    onClick={() => setCurrent(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      idx === current
                        ? "w-6 bg-entreva-green"
                        : "w-2 bg-border hover:bg-muted-foreground"
                    )}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-entreva-green hover:text-entreva-green"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
