"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  left: number
  top: number
  size: number
  delay: number
  duration: number
  opacity: number
  type: "dot" | "heart"
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const count = 22
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: random(0, 100),
      top: random(0, 100),
      size: random(3, 6),
      delay: random(0, 20),
      duration: random(18, 28),
      opacity: random(0.12, 0.28),
      type: i % 4 === 0 ? "heart" : "dot",
    }))
    setParticles(generated)
  }, [])

  if (particles.length === 0) return null

  return (
    <div
      className="ambient-particles"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="ambient-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.type === "heart" ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <span className="ambient-particle-dot" />
          )}
        </div>
      ))}
    </div>
  )
}
