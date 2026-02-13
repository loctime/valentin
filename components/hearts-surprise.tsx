"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface BurstHeart {
  id: number
  x: number
  y: number
  delay: number
  drift: number
  size: number
}

const HEART_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

function randomIn(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function HeartsSurprise() {
  const [hearts, setHearts] = useState<BurstHeart[]>([])
  const nextId = useRef(0)
  const reduceMotion = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reduceMotion.current = mq.matches
    const handler = () => {
      reduceMotion.current = mq.matches
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const spawnHearts = useCallback((clientX: number, clientY: number) => {
    if (reduceMotion.current) return
    const count = Math.floor(randomIn(5, 8))
    const newHearts: BurstHeart[] = Array.from({ length: count }, () => ({
      id: nextId.current++,
      x: clientX + randomIn(-12, 12),
      y: clientY + randomIn(-8, 8),
      delay: randomIn(0, 0.12),
      drift: randomIn(-18, 18),
      size: randomIn(10, 18),
    }))
    setHearts((prev) => [...prev, ...newHearts])
    const ids = newHearts.map((h) => h.id)
    const t = setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !ids.includes(h.id)))
    }, 1100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-hearts-surprise]")
      if (target) spawnHearts(e.clientX, e.clientY)
    }
    document.addEventListener("click", handleClick, { passive: true })
    return () => document.removeEventListener("click", handleClick)
  }, [spawnHearts])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-burst-item absolute text-primary"
          style={{
            left: heart.x,
            top: heart.y,
            width: heart.size,
            height: heart.size,
            animationDelay: `${heart.delay}s`,
            ["--heart-drift" as string]: `${heart.drift}px`,
          }}
        >
          {HEART_SVG}
        </div>
      ))}
    </div>
  )
}
