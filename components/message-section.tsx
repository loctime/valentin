"use client"

import { useEffect, useRef, useState } from "react"
import { useInViewOnce } from "@/hooks/use-in-view-once"

const lines = [
  "Trabajamos uno frente al otro,",
  "y aunque no nos conocemos mucho,",
  "quise tomarme un momento",
  "para decirte hola.",
  "",
  "A veces los mejores encuentros",
  "empiezan con un gesto sencillo.",
  "",
  "Este es el mio.",
]

export function MessageSection() {
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
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    )

    lineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="flex min-h-svh items-center justify-center px-6 py-20">
      <div
        ref={sectionRef}
        className={`reveal-in-view ${sectionVisible ? "is-visible" : ""} w-full max-w-sm rounded-2xl bg-card p-8 shadow-sm cursor-default`}
        data-hearts-surprise
      >
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => {
            if (line === "") {
              return (
                <div
                  key={i}
                  ref={(el) => { lineRefs.current[i] = el as HTMLParagraphElement }}
                  data-index={i}
                  className="h-4"
                  aria-hidden="true"
                />
              )
            }

            const isVisible = visibleLines.includes(i)

            return (
              <p
                key={i}
                ref={(el) => { lineRefs.current[i] = el }}
                data-index={i}
                className="message-line font-serif text-lg leading-relaxed text-card-foreground"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0)"
                    : "translateY(12px)",
                  transitionDelay: isVisible ? `${i * 0.08}s` : "0s",
                }}
              >
                {line}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}
