"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export interface UseInViewOnceOptions {
  /** Porción del elemento que debe ser visible (0–1). Por defecto 0.15 */
  threshold?: number
  /** Margen del viewport, ej. "0px 0px -5% 0px" para disparar un poco antes */
  rootMargin?: string
}

/**
 * Detecta cuando el elemento entra en viewport. Solo actualiza una vez (primera vez).
 * Deja de observar tras la primera intersección para mejor rendimiento.
 */
export function useInViewOnce(
  options: UseInViewOnceOptions = {}
): [ (node: HTMLElement | null) => void, boolean ] {
  const { threshold = 0.15, rootMargin = "0px 0px -5% 0px" } = options
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (elRef.current && observerRef.current) {
        observerRef.current.unobserve(elRef.current)
        observerRef.current = null
      }
      elRef.current = node
      if (node && !hasBeenVisible) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setHasBeenVisible(true)
              observer.unobserve(entry.target)
              observerRef.current = null
            }
          },
          { threshold, rootMargin }
        )
        observerRef.current = observer
        observer.observe(node)
      }
    },
    [threshold, rootMargin, hasBeenVisible]
  )

  useEffect(() => {
    return () => {
      if (observerRef.current && elRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [])

  return [setRef, hasBeenVisible]
}
