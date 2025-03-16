import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'discord-webhook-tool',
  description: 'Created by Lyxtem',
  generator: 'Lyxtem-is-a.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
