'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function Subnav() {
  const pathname = usePathname()
  const { userId } = useParams()

  const moodPath = `/profile/${userId}`

  const isMoodPath = pathname === moodPath

  return (
    <div className="grid grid-cols-2 p-[5px] bg-teal-700 shadow-sm rounded-md text-center font-semibold">
      <Link
        className={`${isMoodPath ? 'bg-teal-800' : ''} p-[0.5rem] rounded-md`}
        href={moodPath}
      >
        Vibe
      </Link>
      <Link
        className={`${isMoodPath ? '' : 'bg-teal-800 '} p-[0.5rem] rounded-md`}
        href={`${moodPath}/guestbook`}
      >
        Guestbook
      </Link>
    </div>
  )
}
