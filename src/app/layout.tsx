import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Shoppersly - The Operating System for Social Commerce",
    template: "%s | Shoppersly",
  },
  description:
    "Shoppersly is the all-in-one operating system for social commerce. Manage orders, products, customers, campaigns, and analytics from a single powerful dashboard.",
  keywords: [
    "social commerce",
    "e-commerce",
    "order management",
    "social selling",
    "shoppersly",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
