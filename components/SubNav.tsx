'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Subnav() {
  const pathname = usePathname()

  const isMoodPath = pathname === '/profile'

  return (
    <div className="grid grid-cols-2 p-[5px] bg-teal-700 shadow-sm rounded-md text-center font-semibold">
      <Link
        className={`${isMoodPath ? 'bg-teal-800' : ''} p-[0.5rem] rounded-md`}
        href="/profile"
      >
        Vibe
      </Link>
      <Link
        className={`${isMoodPath ? '' : 'bg-teal-800 '} p-[0.5rem] rounded-md`}
        href="/profile/guestbook"
      >
        Guestbook
      </Link>
    </div>
  )
}
