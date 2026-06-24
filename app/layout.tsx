import React from "react"
import type { Metadata } from "next"
import { Inter, Space_Mono } from "next/font/google"
import "./globals.css"
import GoogleAnalytics from "@/components/google-analytics"
import { Toaster } from "@/components/ui/sonner" // Ensure you have a toaster for auth feedback

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Entreva Hub | Building Entrepreneurs. Creating Jobs.",
  description:
    "Entreva Hub is an entrepreneurship and innovation hub dedicated to empowering individuals, startups, and businesses to create sustainable solutions and meaningful employment in Ghana and Africa.",
  openGraph: {
    title: "Entreva Hub | Building Entrepreneurs. Creating Jobs.",
    description:
      "Empowering individuals, startups, and businesses to create sustainable solutions and meaningful employment in Ghana and Africa.",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#00C26E",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-7DCVGLT6XM" />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}