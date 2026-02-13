"use client"

import { useEffect, useRef, useState } from "react"

const LERP = 0.032
const MAX_OFFSET = 24

export function FloatingCharacter() {
  const [display, setDisplay] = useState({ x: 0, y: 0 })
  const cursorRef = useRef({ x: 0, y: 0 })
  const displayRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let rafId = 0
    let mounted = true

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const nx = (e.clientX / w - 0.5) * 2
      const ny = (e.clientY / h - 0.5) * 2
      cursorRef.current = { x: nx * MAX_OFFSET, y: ny * MAX_OFFSET }
    }

    const lerp = () => {
      if (!mounted) return
      const { x: cx, y: cy } = cursorRef.current
      const dx = cx - displayRef.current.x
      const dy = cy - displayRef.current.y
      displayRef.current.x += dx * LERP
      displayRef.current.y += dy * LERP
      setDisplay({ ...displayRef.current })
      rafId = requestAnimationFrame(lerp)
    }

    rafId = requestAnimationFrame(lerp)
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      mounted = false
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      className="floating-character pointer-events-none fixed bottom-[18%] left-1/2 z-[1]"
      style={{
        transform: `translate(calc(-50% + ${display.x}px), ${display.y}px)`,
      }}
      aria-hidden="true"
    >
      <svg
        className="floating-character-svg h-16 w-16 sm:h-20 sm:w-20"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cuerpo suave (forma de gota/ovalo) */}
        <ellipse
          cx="32"
          cy="40"
          rx="20"
          ry="18"
          fill="hsl(340 45% 92%)"
          stroke="hsl(350 35% 85%)"
          strokeWidth="1.2"
        />
        {/* Cabeza */}
        <circle
          cx="32"
          cy="22"
          r="14"
          fill="hsl(340 45% 92%)"
          stroke="hsl(350 35% 85%)"
          strokeWidth="1.2"
        />
        {/* Mejilla izquierda (blush) */}
        <ellipse cx="22" cy="24" rx="4" ry="2.5" fill="hsl(350 50% 88%)" opacity="0.7" />
        {/* Mejilla derecha */}
        <ellipse cx="42" cy="24" rx="4" ry="2.5" fill="hsl(350 50% 88%)" opacity="0.7" />
        {/* Ojo izquierdo */}
        <ellipse cx="27" cy="21" rx="2.5" ry="3" fill="hsl(260 25% 45%)" />
        {/* Ojo derecho */}
        <ellipse cx="37" cy="21" rx="2.5" ry="3" fill="hsl(260 25% 45%)" />
        {/* Brillos ojos */}
        <circle cx="27.5" cy="20" r="0.6" fill="hsl(0 0% 100%)" />
        <circle cx="37.5" cy="20" r="0.6" fill="hsl(0 0% 100%)" />
        {/* Sonrisa suave */}
        <path
          d="M 28 28 Q 32 32 36 28"
          stroke="hsl(350 40% 70%)"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
