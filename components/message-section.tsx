"use client"

import { useEffect, useRef, useState } from "react"

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
  const [sectionVisible, setSectionVisible] = useState(false)
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setSectionVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) sectionObserver.observe(sectionRef.current)
    return () => sectionObserver.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex min-h-svh items-center justify-center px-6 py-20"
    >
      <div
        className={`w-full max-w-sm rounded-2xl bg-card p-8 shadow-sm ${sectionVisible ? "section-reveal" : ""}`}
      >
        <div className="reveal-item reveal-item-0">
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
      </div>
    </section>
  )
}
