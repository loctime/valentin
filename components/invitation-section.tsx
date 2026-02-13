"use client"

import { useInViewOnce } from "@/hooks/use-in-view-once"
import { SakuraFlowerSelector } from "@/components/sakura-flower-selector"

interface InvitationSectionProps {
  onBackToStart?: () => void
}

export function InvitationSection({ onBackToStart }: InvitationSectionProps) {
  const [ref, visible] = useInViewOnce({
    threshold: 0.2,
    rootMargin: "0px 0px -5% 0px",
  })

  return (
    <section className="flex min-h-svh items-center justify-center px-6 py-20">
      <div
        ref={ref}
        className={`flex w-full max-w-sm flex-col items-center gap-8 text-center ${visible ? "is-visible" : ""}`}
      >
        <p className="font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
          ¿Qué te gustaría hacer?
        </p>

        <SakuraFlowerSelector />

        <p className="max-w-[260px] text-xs leading-relaxed text-muted-foreground">
          Elige una o varias opciones. Y si solo viniste por los chocolates,
          también está perfecto.
        </p>

        {onBackToStart && (
          <button
            type="button"
            onClick={onBackToStart}
            className="btn-romantic-cta rounded-full border border-primary/30 bg-transparent px-6 py-2.5 text-xs font-medium text-foreground hover:bg-primary/10"
            data-hearts-surprise
          >
            Volver al inicio
          </button>
        )}

        <svg
          className="h-4 w-4 cursor-pointer text-[hsl(350_40%_62%)] opacity-35 animate-pulse-soft"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          data-hearts-surprise
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </section>
  )
}
