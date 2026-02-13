"use client"

import { useEffect } from "react"

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  selectedOptions: string[]
  customMessage?: string
}

const HeartBullet = () => (
  <svg
    className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--primary))]"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

export function ConfirmModal({
  open,
  onClose,
  selectedOptions,
  customMessage = "",
}: ConfirmModalProps) {
  useEffect(() => {
    if (open) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose()
      }
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = ""
      }
    }
  }, [open, onClose])

  if (!open) return null

  const hasCustomMessage = customMessage.trim().length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out"
        aria-label="Cerrar"
      />

      <div
        className="relative w-full max-w-sm rounded-2xl border border-primary/20 bg-card p-6 shadow-xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-modal-title"
          className="font-serif text-xl font-medium text-foreground sm:text-2xl"
        >
          Ya tengo tu respuesta ❤️
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Solo debemos coordinar para:
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {selectedOptions.map((option, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <HeartBullet />
              <span>{option}</span>
            </li>
          ))}
        </ul>
        {hasCustomMessage && (
          <p className="mt-4 rounded-xl border border-primary/20 bg-background/50 px-4 py-3 text-sm text-foreground">
            {customMessage.trim()}
          </p>
        )}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="btn-romantic-cta rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
