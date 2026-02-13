"use client"

import { useState, useCallback } from "react"
import { useInViewOnce } from "@/hooks/use-in-view-once"
import { SakuraFlowerSelector } from "@/components/sakura-flower-selector"
import { ProposalModal } from "@/components/proposal-modal"
import { ConfirmModal } from "@/components/ConfirmModal"
import type { ProposalConfirmPayload } from "@/components/proposal-modal"
import { saveInvitationResponse } from "@/lib/invitation"

interface InvitationSectionProps {
  onBackToStart?: () => void
  onProposalConfirm?: (payload: ProposalConfirmPayload) => void
}

export function InvitationSection({ onBackToStart, onProposalConfirm }: InvitationSectionProps) {
  const [ref, visible] = useInViewOnce({
    threshold: 0.2,
    rootMargin: "0px 0px -5% 0px",
  })
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [customMessage, setCustomMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProposalOpen, setIsProposalOpen] = useState(false)
  const [confirmData, setConfirmData] = useState<{
    selectedOptions: string[]
    customMessage: string
  }>({ selectedOptions: [], customMessage: "" })

  const handleSelectionChange = useCallback((options: string[]) => {
    setSelectedOptions(options)
  }, [])

  const canSubmit =
    selectedOptions.length > 0 || customMessage.trim().length > 0

  const handleConfirm = useCallback(
    async (payload: ProposalConfirmPayload) => {
      const hasOptions = payload.selectedOptions.length > 0
      const hasMessage = payload.customMessage.trim().length > 0
      if (!hasOptions && !hasMessage) return

      setIsSaving(true)
      try {
        await saveInvitationResponse({
          selectedOptions: payload.selectedOptions,
          customMessage: payload.customMessage,
        })
        setIsProposalOpen(false)
        setConfirmData({
          selectedOptions: payload.selectedOptions,
          customMessage: payload.customMessage,
        })
        setIsModalOpen(true)
        onProposalConfirm?.(payload)
      } catch {
        // TODO: mostrar error al usuario (ej. toast o estado de error)
      } finally {
        setIsSaving(false)
      }
    },
    [onProposalConfirm]
  )

  return (
    <section className="flex min-h-[100dvh] items-center justify-center px-6 py-20">
      <div
        ref={ref}
        className={`flex w-full max-w-sm flex-col items-center gap-8 text-center ${visible ? "is-visible" : ""}`}
      >
        <div className="relative">
          <img
            src="/CORA2.svg"
            alt=""
            className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-52 -translate-x-1/2 -translate-y-1/2 object-contain opacity-55 sm:h-48 sm:w-64"
            aria-hidden
          />
          <p className="relative z-10 font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
            Quiero invitarte a salir! <br /><br /><b>Podemos hacer un monton de cosas!
           
            </b>
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs text-muted-foreground">presiona los petalos!</p>
          <SakuraFlowerSelector onSelectionChange={handleSelectionChange} />
          <button
            type="button"
            onClick={() => setIsProposalOpen(true)}
            disabled={!canSubmit || isSaving}
            className="btn-romantic-cta rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            {isSaving ? "Guardando…" : "👉 Aceptar propuesta"}
          </button>
        </div>

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

        <ProposalModal
          open={isProposalOpen}
          selections={selectedOptions}
          customMessage={customMessage}
          onChangeCustomMessage={setCustomMessage}
          onClose={() => setIsProposalOpen(false)}
          onConfirm={handleConfirm}
          isSaving={isSaving}
        />

        <ConfirmModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedOptions={confirmData.selectedOptions}
          customMessage={confirmData.customMessage}
        />

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
