import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AGENCY } from '@/lib/agency'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const SITE_URL = 'https://majestadepersonalizados.com.br'
const OG_TITLE = 'Majestade Personalizados | Brindes Corporativos em Montenegro, RS'
const OG_DESCRIPTION = 'Mais de 15 anos fabricando brindes corporativos personalizados para empresas. Canecas, chaveiros, squeezes e produtos sob medida com a identidade da sua marca.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  creator: AGENCY.name,
  authors: [{ name: 'Majestade Personalizados' }],
  other: {
    developer: `${AGENCY.name} — ${AGENCY.website}`,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    siteName: 'Majestade Personalizados',
    locale: 'pt_BR',
    images: [
      {
        url: '/logo-majestade-navy-gold.png',
        width: 1200,
        height: 630,
        alt: 'Majestade Personalizados — Brindes Corporativos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ['/logo-majestade-navy-gold.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Majestade Personalizados',
  description: OG_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-majestade-navy-gold.png`,
  image: `${SITE_URL}/logo-majestade-navy-gold.png`,
  foundingDate: '2016',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Montenegro',
    addressRegion: 'RS',
    addressCountry: 'BR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Portuguese',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Brazil',
  },
  sameAs: [
    'https://www.instagram.com/majestadepersonalizados/',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
