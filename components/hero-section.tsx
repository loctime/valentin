"use client"

import { FloatingHearts } from "@/components/floating-hearts"

interface HeroSectionProps {
  onContinue: () => void
}

export function HeroSection({ onContinue }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center px-6">
      <FloatingHearts />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <div
          className="text-4xl"
          style={{ animation: "fade-in 0.8s ease-out forwards" }}
          aria-hidden="true"
        >
          {"<3"}
        </div>

        <h1
          className="max-w-xs font-serif text-2xl leading-relaxed tracking-tight text-foreground sm:text-3xl"
          style={{
            animation: "fade-in-up 0.8s ease-out 0.3s forwards",
            opacity: 0,
          }}
        >
          <span className="text-balance">
            {"Hola :) Si llegaste aqui es porque escaneaste el QR."}
          </span>
        </h1>

        <p
          className="max-w-[260px] text-sm leading-relaxed text-muted-foreground"
          style={{
            animation: "fade-in-up 0.8s ease-out 0.7s forwards",
            opacity: 0,
          }}
        >
          {"Gracias por tomarte un momento."}
        </p>

        <button
          onClick={onContinue}
          className="mt-4 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-md transition-all duration-300 hover:shadow-lg active:scale-95"
          style={{
            animation: "fade-in-up 0.8s ease-out 1.1s forwards",
            opacity: 0,
          }}
        >
          Continuar
        </button>
      </div>
    </section>
  )
}
