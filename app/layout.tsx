import Nav from '@/components/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'
import ToasterClient from '@/components/ToasterClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VibeLog',
  description: 'Your vibe check and guestbook app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-2xl px-3 mx-auto sm:px-0">
          <AuthProvider>
            <Nav />
            <section className="mt-5">{children}</section>
          </AuthProvider>
          <ToasterClient />
        </main>
      </body>
    </html>
  )
}
