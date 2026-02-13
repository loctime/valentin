"use client"

import { useInViewOnce } from "@/hooks/use-in-view-once"

export function InvitationSection() {
  const [ref, visible] = useInViewOnce({
    threshold: 0.2,
    rootMargin: "0px 0px -5% 0px",
  })

  return (
    <section className="flex min-h-svh items-center justify-center px-6 py-20">
      <div
        ref={ref}
        className={`reveal-in-view flex w-full max-w-sm flex-col items-center gap-8 text-center ${visible ? "is-visible section-reveal" : ""}`}
      >
        {/* coffee icon */}
        <div className="reveal-item reveal-item-0 flex h-14 w-14 items-center justify-center rounded-full bg-secondary" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="hsl(20 15% 20%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="2" x2="6" y2="4" />
            <line x1="10" y1="2" x2="10" y2="4" />
            <line x1="14" y1="2" x2="14" y2="4" />
          </svg>
        </div>

        <p className="reveal-item reveal-item-1 font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
          {"Si te gustaria tomar un cafe algun dia, me encantaria invitarte :)"}
        </p>

        <a
          href="#"
          className="btn-romantic-cta reveal-item reveal-item-2 w-full rounded-full bg-primary px-8 py-3.5 text-center text-sm font-medium text-primary-foreground"
          data-hearts-surprise
        >
          Escribirme
        </a>

        <p className="reveal-item reveal-item-3 max-w-[240px] text-xs leading-relaxed text-muted-foreground">
          {"Y si solo viniste por los chocolates, tambien esta perfecto."}
        </p>

        {/* small heart footer */}
        <svg
          className="reveal-item reveal-item-4 mt-6 h-4 w-4 cursor-pointer text-[hsl(350_40%_62%)] opacity-35 animate-pulse-soft"
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
