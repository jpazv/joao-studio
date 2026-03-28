import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'João Paulo Azevedo — AI Agents & Frontend Engineer',
  description: 'Building autonomous agents and interfaces that feel like the future.',
  openGraph: {
    title: 'João Paulo Azevedo — AI Agents & Frontend Engineer',
    description: 'Building autonomous agents and interfaces that feel like the future.',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
