"use client"

import { useEffect, useRef, useState } from "react"
import { useInViewOnce } from "@/hooks/use-in-view-once"

const lines = [
  "Que este pequeño detalle",
  "te traiga una sonrisa",
  "y que siempre que lo recuerdes",
  "sepas que hay alguien cerca",
  "que te desea lo mejor.",
  "",
  "Gracias por ser tan buena vecina.",
]

interface MessageSection2Props {
  onContinue?: () => void
}

export function MessageSection2({ onContinue }: MessageSection2Props) {
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
    <section className="relative flex min-h-svh items-center justify-center px-6 py-20">
      <div
        ref={sectionRef}
        className={`reveal-in-view-left w-full max-w-sm rounded-xl border border-border/80 bg-card/95 py-8 pl-8 pr-8 shadow-sm cursor-default ${sectionVisible ? "is-visible" : ""}`}
        style={{
          borderLeftWidth: "4px",
          borderLeftColor: "hsl(var(--primary))",
        }}
      >
        <div className="flex flex-col gap-2">
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
                className="message-line-2 font-serif text-base leading-relaxed text-muted-foreground"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateX(0)"
                    : "translateX(-16px)",
                  transitionDelay: isVisible ? `${i * 0.1}s` : "0s",
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
