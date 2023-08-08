'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Subnav() {
  const pathname = usePathname()

  const isMoodPath = pathname === '/profile'

  return (
    <div className="grid grid-cols-2 p-2 bg-white shadow-sm rounded-md text-center font-medium">
      <Link
        className={`${isMoodPath ? 'bg-slate-200' : ''} p-[0.45rem] rounded-md`}
        href="/profile"
      >
        Vibe
      </Link>
      <Link
        className={`${isMoodPath ? '' : 'bg-slate-200'} p-[0.45rem] rounded-md`}
        href="/profile/guestbook"
      >
        Guestbook
      </Link>
    </div>
  )
}
