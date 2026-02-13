import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { HeartsSurprise } from "@/components/hearts-surprise"
import { AmbientParticles } from "@/components/ambient-particles"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Para ti",
  description: "Un detalle para decirte hola",
}

export const viewport: Viewport = {
  themeColor: "#f2ebe4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        <AmbientParticles />
        <HeartsSurprise />
        {children}
      </body>
    </html>
  )
}
