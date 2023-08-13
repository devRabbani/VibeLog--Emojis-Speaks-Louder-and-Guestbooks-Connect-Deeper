'use client'

import Link from 'next/link'
import {
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiMenu2Line,
  RiTimeLine,
  RiUser2Fill,
  RiUser2Line,
} from 'react-icons/ri'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { ErrorInfo, useState } from 'react'
import { migrateData, showData } from '@/lib/helper'

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
    <nav className="p-3 bg-teal-700 sticky top-3 rounded-md shadow-lg">
      <div className="flex justify-between items-center w-full">
        <Link className="text-2xl font-bold" href="/">
          VibeLog
        </Link>
        <button onClick={() => showData()}>SHow Data</button>
        <div className="flex items-center gap-1 font-semibold">
          {pathname === '/' ? (
            session ? (
              <Link
                className="flex items-center gap-1 justify-center w-20"
                href={`/profile/${session?.user?.user_id}`}
              >
                <RiUser2Line /> Profile
              </Link>
            ) : (
              <button
                onClick={() => alert('You need to login first')}
                disabled={isDisabled}
                className="flex items-center justify-center gap-1 disabled:opacity-50 w-20"
              >
                <RiUser2Line /> Profile
              </button>
            )
          ) : (
            <Link
              className="flex items-center gap-1 justify-center w-20"
              href="/"
            >
              <RiTimeLine /> Feed
            </Link>
          )}
          <span className="opacity-30">|</span>
          {session ? (
            <button
              onClick={handleSignOut}
              disabled={isDisabled}
              className="flex items-center justify-center gap-1 text-pink-800 disabled:opacity-50 w-20"
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
