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
          className="heart-decorative text-4xl"
          aria-hidden="true"
        >
          {"<3"}
        </div>

        <h1 className="animate-romantic-in animate-romantic-in-delay-1 max-w-xs font-serif text-2xl leading-relaxed tracking-tight text-foreground sm:text-3xl">
          <span className="text-balance">
            {"Hola :) Si llegaste aqui es porque escaneaste el QR."}
          </span>
        </h1>

        <p className="animate-romantic-in animate-romantic-in-delay-2 max-w-[260px] text-sm leading-relaxed text-muted-foreground">
          {"Gracias por tomarte un momento."}
        </p>

        <button
          onClick={onContinue}
          className="btn-romantic-cta animate-romantic-in animate-romantic-in-delay-3 mt-4 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
        >
          Continuar
        </button>
      </div>
    </section>
  )
}
