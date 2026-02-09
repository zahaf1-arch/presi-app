import type { Metadata } from "next"
import { LanguageProvider } from "@/lib/i18n"
import "./globals.css"

export const metadata: Metadata = {
  title: "Election Management System",
  description: "Presidential election management application",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
