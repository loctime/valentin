"use client"

import { useRef } from "react"
import { HeroSection } from "@/components/hero-section"
import { MessageSection } from "@/components/message-section"
import { InvitationSection } from "@/components/invitation-section"

export default function Page() {
  const messageRef = useRef<HTMLDivElement>(null)

  function handleContinue() {
    messageRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="relative">
      <HeroSection onContinue={handleContinue} />

      <div ref={messageRef}>
        <MessageSection />
      </div>

      <InvitationSection />
    </main>
  )
}
