"use client"

import { useEffect, useRef, useState } from "react"
import { useInViewOnce } from "@/hooks/use-in-view-once"

const lines = [
  "De lejos siempre te vi",
  "brillando con tu alegría y amabilidad.",
  "",
  "Espero que esto te recuerde",
  "que tu energía contagia",
  "de una forma única y especial.",
  "",
  "Saludos cercanos!",
  
]

interface MessageSection3Props {
  onContinue?: () => void
}

export function MessageSection3({ onContinue }: MessageSection3Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const [sectionRef, sectionVisible] = useInViewOnce({
    threshold: 0.15,
    rootMargin: "0px 0px -5% 0px",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            if (!isNaN(index)) {
              setVisibleLines((prev) =>
                prev.includes(index) ? prev : [...prev, index]
              )
            }
          }
        })
      },
      { threshold: 0.25, rootMargin: "0px 0px -15% 0px" }
    )

    lineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center px-6 py-20">
      <div
        ref={sectionRef}
        className={`reveal-in-view-scale w-full max-w-sm rounded-2xl bg-card/90 py-8 px-8 shadow-md cursor-default ${sectionVisible ? "is-visible" : ""}`}
      >
        <div className="flex flex-col gap-2 text-center">
          {lines.map((line, i) => {
            if (line === "") {
              return (
                <div
                  key={i}
                  ref={(el) => {
                    lineRefs.current[i] = el as HTMLParagraphElement
                  }}
                  data-index={i}
                  className="h-3"
                  aria-hidden="true"
                />
              )
            }

            const isVisible = visibleLines.includes(i)

            return (
              <p
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el
                }}
                data-index={i}
                className="message-line-3 font-serif text-lg leading-relaxed text-card-foreground"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "scale(1)"
                    : "scale(0.96)",
                  transitionDelay: isVisible ? `${i * 0.09}s` : "0s",
                }}
              >
                {line}
              </p>
            )
          })}
        </div>
        {onContinue && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onContinue}
              className="btn-romantic-cta rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
              data-hearts-surprise
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
