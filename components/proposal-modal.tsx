"use client"

import { useEffect } from "react"

export interface ProposalConfirmPayload {
  selectedOptions: string[]
  customMessage: string
}

interface ProposalModalProps {
  open: boolean
  selections: string[]
  customMessage: string
  onChangeCustomMessage: (value: string) => void
  onClose: () => void
  onConfirm: (payload: ProposalConfirmPayload) => void
  isSaving?: boolean
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

export function ProposalModal({
  open,
  selections,
  customMessage,
  onChangeCustomMessage,
  onClose,
  onConfirm,
  isSaving = false,
}: ProposalModalProps) {
  useEffect(() => {
    if (open) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && !isSaving) onClose()
      }
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = ""
      }
    }
  }, [open, onClose, isSaving])

  if (!open) return null

  const handleConfirm = () => {
    onConfirm({ selectedOptions: selections, customMessage })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
    >
      {/* Overlay: cierra al hacer click fuera */}
      <button
        type="button"
        onClick={onClose}
        disabled={isSaving}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out disabled:pointer-events-none"
        aria-label="Cerrar"
      />

      {/* Contenido: animación opacity + scale */}
      <div
        className="relative w-full max-w-sm rounded-2xl border border-primary/20 bg-card p-6 shadow-xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="proposal-modal-title"
          className="font-serif text-xl font-medium text-foreground sm:text-2xl"
        >
          ¡Estupendo! Tenemos una cita :)
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Solo debemos coordinar nuestro tiempo para:
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {selections.map((option, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <HeartBullet />
              <span>{option}</span>
            </li>
          ))}
        </ul>

        <label htmlFor="proposal-custom-message" className="sr-only">
          Idea adicional opcional
        </label>
        <textarea
          id="proposal-custom-message"
          value={customMessage}
          onChange={(e) => onChangeCustomMessage(e.target.value)}
          placeholder="¿Tienes una idea mejor? Puedes escribirla aquí..."
          rows={3}
          disabled={isSaving}
          className="mt-4 w-full rounded-xl border border-primary/20 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-70"
        />

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSaving}
            className="btn-romantic-cta rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-70 disabled:pointer-events-none"
          >
            {isSaving ? "Guardando…" : "Confirmar"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-full border border-primary/30 bg-transparent px-6 py-2.5 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors disabled:opacity-70 disabled:pointer-events-none"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
