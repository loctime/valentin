"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  left: string
  top: string
  size: number
  delay: number
  duration: number
  opacity: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 88 + 6}%`,
      top: `${Math.random() * 82 + 8}%`,
      size: Math.random() * 12 + 10,
      delay: Math.random() * 6,
      duration: Math.random() * 6 + 12,
      opacity: Math.random() * 0.2 + 0.12,
    }))
    setHearts(generated)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="float-heart absolute"
          style={{
            left: heart.left,
            top: heart.top,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            animation: `float-heart ${heart.duration}s cubic-bezier(0.4, 0, 0.6, 1) ${heart.delay}s infinite`,
          }}
          viewBox="0 0 24 24"
          fill="hsl(350 40% 62%)"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  )
}
