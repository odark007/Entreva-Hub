import type { Metadata } from "next"
import type { ReactNode } from "react"

const siteUrl = "https://entrevahub.org"

export const metadata: Metadata = {
  title: "ACTIVATE Application | Entreva Hub",
  description:
    "Apply to the ACTIVATE program - a Mastercard Foundation project strengthening Ghana's Agriculture TVET system through industry-led skills training and youth empowerment.",
  openGraph: {
    title: "ACTIVATE Application | Entreva Hub",
    description:
      "Apply to the ACTIVATE program - a Mastercard Foundation project strengthening Ghana's Agriculture TVET system through industry-led skills training and youth empowerment.",
    url: `${siteUrl}/programmes/activate/participate`,
    siteName: "Entreva Hub",
    images: [
      {
        url: `${siteUrl}/activate-entreva-hub-og.jpg`,
        width: 1200,
        height: 630,
        alt: "ACTIVATE Program - Entreva Hub",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACTIVATE Application | Entreva Hub",
    description:
      "Apply to the ACTIVATE program - a Mastercard Foundation project strengthening Ghana's Agriculture TVET system through industry-led skills training and youth empowerment.",
    images: [`${siteUrl}/activate-entreva-hub-og.jpg`],
  },
}

export default function ActivateParticipateLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}