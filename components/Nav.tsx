'use client'

import Link from 'next/link'
import {
  RiLoginBoxLine,
  RiMenu2Line,
  RiTimeLine,
  RiUser2Fill,
  RiUser2Line,
} from 'react-icons/ri'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="p-3 bg-teal-700 sticky top-3 rounded-md shadow-md">
      <div className="flex justify-between items-center w-full">
        <Link className="text-2xl font-bold" href="/">
          VibeLog
        </Link>

        <div className="flex items-center gap-2 font-semibold">
          {pathname === '/' ? (
            <Link className="flex items-center gap-1" href="/profile">
              <RiUser2Line /> Profile
            </Link>
          ) : (
            <Link className="flex items-center gap-1" href="/">
              <RiTimeLine /> Feed
            </Link>
          )}
          <span className="opacity-40">|</span>
          <button className="flex items-center gap-1">
            <RiLoginBoxLine /> Login
          </button>
        </div>
      </div>
    </nav>
  )
}
