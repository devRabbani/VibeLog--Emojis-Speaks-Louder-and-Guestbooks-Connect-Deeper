import Nav from '@/components/Layout/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'
import ToasterClient from '@/components/Layout/ToasterClient'
import AddVibeDialog from '@/components/AddVibeComps/AddVibeDialog'

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: 'VibeLog | Emojis Speaks Louder and Guestbooks Connect Deeper',
  description:
    'Share moods using emojis, connect through guestbook messages. Your space for mood expression and guestbook interactions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${fredoka.className} antialiased`}>
        <main className="playful-shell relative max-w-3xl px-4 pb-10 mx-auto sm:px-6">
          <AuthProvider>
            <Nav />
            <section className="mt-6 space-y-5">{children}</section>
            <AddVibeDialog />
          </AuthProvider>
          <ToasterClient />
        </main>
      </body>
    </html>
  )
}
