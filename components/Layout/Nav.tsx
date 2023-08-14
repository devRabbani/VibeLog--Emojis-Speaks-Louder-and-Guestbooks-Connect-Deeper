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

  console.log(session?.user, status)

  return (
    <nav className="p-3 bg-teal-700 sticky top-3 rounded-md shadow-lg z-50">
      <div className="flex justify-between items-center w-full">
        <Link className="text-2xl font-bold" href="/">
          VibeLog
        </Link>

        <div className="flex items-center gap-1 font-semibold">
          {pathname === '/' ? (
            session ? (
              <Link
                className="flex items-center gap-1 justify-center w-20"
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
                className="flex items-center justify-center gap-1 disabled:opacity-50 w-20"
              >
                <RiUser3Fill /> Profile
              </button>
            )
          ) : (
            <Link
              className="flex items-center gap-1 justify-center w-20"
              href="/"
            >
              <CgFeed /> Feed
            </Link>
          )}
          <span className="opacity-30">|</span>
          {session ? (
            <button
              onClick={handleSignOut}
              disabled={isDisabled}
              className="flex items-center justify-center gap-1 text-yellow-500 disabled:opacity-50 w-20"
            >
              <RiLogoutBoxLine /> Logout
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={isDisabled}
              className="flex items-center justify-center gap-1 disabled:opacity-50 w-20"
            >
              <RiLoginBoxLine /> Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
