'use client'

import Link from 'next/link'
import { RiLoginBoxLine, RiLogoutBoxLine, RiUser3Fill } from 'react-icons/ri'
import { CgFeed } from 'react-icons/cg'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Nav() {
  // Local States
  const [isLogging, setIsLogging] = useState(false)

  const pathname = usePathname()
  const { data: session, status } = useSession()

  const isDisabled = status === 'loading' || isLogging

  const handleSignIn = async () => {
    try {
      setIsLogging(true)
      await signIn('google')
      setIsLogging(false)
    } catch (error: any) {
      console.log(error?.message)
    }
  }

  const handleSignOut = async () => {
    try {
      setIsLogging(true)
      await signOut()
      setIsLogging(false)
    } catch (error: any) {
      console.log(error?.message)
    }
  }

  return (
    <nav className="card-surface rounded-shell sticky top-4 z-50 px-5 py-4 border border-white/60 shadow-[0_18px_60px_rgba(15,23,42,0.18)] sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          className="flex items-center gap-3 text-3xl font-semibold text-slate-900"
          href="/"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-teal-600 text-white text-2xl font-black leading-none shadow-inner">
            V
          </span>
          VibeLog
        </Link>

        <div className="flex flex-wrap items-center gap-2 font-semibold text-sm sm:text-base">
          {pathname === '/' ? (
            session ? (
              <Link
                className="bubble-border bg-white/80 px-4 py-2 flex items-center gap-1 justify-center text-teal-700 hover:text-teal-900 hover:border-teal-600/30 transition"
                href={`/profile/${session?.user?.user_id}`}
              >
                <RiUser3Fill /> Profile
              </Link>
            ) : (
              <button
                onClick={() =>
                  toast.error('You are not allowed!', {
                    description: 'Pleas sign in to unlock all the features',
                  })
                }
                disabled={isDisabled}
                className="bubble-border bg-white/80 px-4 py-2 flex items-center justify-center gap-1 disabled:opacity-50 text-teal-700 hover:text-teal-900 hover:border-teal-600/30 transition"
              >
                <RiUser3Fill /> Profile
              </button>
            )
          ) : (
            <Link
              className="bubble-border bg-white/80 px-4 py-2 flex items-center gap-1 justify-center text-teal-700 hover:text-teal-900 hover:border-teal-600/30 transition"
              href="/"
            >
              <CgFeed /> Feed
            </Link>
          )}
          {session ? (
            <button
              onClick={handleSignOut}
              disabled={isDisabled}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white shadow-md flex items-center justify-center gap-1 disabled:opacity-50 transition hover:brightness-95"
            >
              <RiLogoutBoxLine /> Logout
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={isDisabled}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-300 via-teal-300 to-emerald-300 text-slate-900 shadow-md flex items-center justify-center gap-1 disabled:opacity-50"
            >
              <RiLoginBoxLine /> Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
