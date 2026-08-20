import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AGENCY } from '@/lib/agency'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Majestade Personalizados | Brindes Corporativos em Montenegro, RS',
  description: 'Mais de 15 anos fabricando brindes corporativos personalizados para empresas. Canecas, chaveiros, squeezes e produtos sob medida com a identidade da sua marca.',
  creator: AGENCY.name,
  authors: [{ name: 'Majestade Personalizados' }],
  other: {
    developer: `${AGENCY.name} — ${AGENCY.website}`,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
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
