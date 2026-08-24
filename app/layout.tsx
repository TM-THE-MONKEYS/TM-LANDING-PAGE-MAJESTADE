import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AGENCY } from '@/lib/agency'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const SITE_URL = 'https://majestadepersonalizados.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Majestade Personalizados | Brindes Corporativos em Montenegro, RS',
  description: 'Mais de 15 anos fabricando brindes corporativos personalizados para empresas. Canecas, chaveiros, squeezes e produtos sob medida com a identidade da sua marca.',
  creator: AGENCY.name,
  authors: [{ name: 'Majestade Personalizados' }],
  other: {
    developer: `${AGENCY.name} — ${AGENCY.website}`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
