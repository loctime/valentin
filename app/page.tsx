"use client"

import { useEffect, useRef, useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { MessageSection } from "@/components/message-section"
import { InvitationSection } from "@/components/invitation-section"

const SECTION_COUNT = 3

export default function Page() {
  const scrollRef = useRef<HTMLMainElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [opacities, setOpacities] = useState<number[]>(() =>
    Array.from({ length: SECTION_COUNT }, (_, i) => (i === 0 ? 1 : 0.72))
  )
  const reduceMotion = useRef(false)

  useEffect(() => {
    document.documentElement.classList.add("narrative-scroll-active")
    return () => document.documentElement.classList.remove("narrative-scroll-active")
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reduceMotion.current = mq.matches
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20)

    const observer = new IntersectionObserver(
      (entries) => {
        setOpacities((prev) => {
          const next = [...prev]
          for (const entry of entries) {
            const i = Number((entry.target as HTMLElement).dataset.index)
            if (Number.isNaN(i) || i < 0 || i >= SECTION_COUNT) continue
            const ratio = entry.intersectionRatio
            next[i] = 0.65 + 0.35 * ratio
          }
          return next
        })
      },
      {
        root: container,
        threshold: thresholds,
        rootMargin: "0px",
      }
    )

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const onScroll = () => {
      if (reduceMotion.current) return
      const y = container.scrollTop * 0.18
      document.body.style.setProperty("--parallax-y", `${y}px`)
    }

    onScroll()
    container.addEventListener("scroll", onScroll, { passive: true })
    return () => container.removeEventListener("scroll", onScroll)
  }, [])

  function handleContinue() {
    messageRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scale = (i: number) => {
    const o = opacities[i] ?? 0.72
    return 0.98 + ((o - 0.65) / 0.35) * 0.02
  }

  return (
    <main
      ref={scrollRef}
      className="narrative-scroll relative"
    >
      <div
        ref={(el) => { sectionRefs.current[0] = el }}
        data-index={0}
        className="narrative-section"
        style={{
          opacity: opacities[0],
          transform: `scale(${scale(0)})`,
        }}
      >
        <HeroSection onContinue={handleContinue} />
      </div>

      <div
        ref={(el) => {
          messageRef.current = el
          sectionRefs.current[1] = el
        }}
        data-index={1}
        className="narrative-section"
        style={{
          opacity: opacities[1],
          transform: `scale(${scale(1)})`,
        }}
      >
        <MessageSection />
      </div>

      <div
        ref={(el) => { sectionRefs.current[2] = el }}
        data-index={2}
        className="narrative-section"
        style={{
          opacity: opacities[2],
          transform: `scale(${scale(2)})`,
        }}
      >
        <InvitationSection />
      </div>
    </main>
  )
}
