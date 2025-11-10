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
        <main className="relative max-w-3xl px-1.5 pb-5 mx-auto sm:px-6 gap-7 min-h-screen flex flex-col">
          <AuthProvider>
            <Nav />
             {children}
            <AddVibeDialog />
          </AuthProvider>
          <ToasterClient />
        </main>
      </body>
    </html>
  )
}
