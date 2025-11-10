'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function Subnav() {
  const pathname = usePathname()
  const { userId } = useParams()

  const moodPath = `/profile/${userId}`

  const isMoodPath = pathname === moodPath

  const tabs = [
    {
      label: 'Vibes',
      href: moodPath,
      emoji: '✨',
      active: isMoodPath,
    },
    {
      label: 'Guestbook',
      href: `${moodPath}/guestbook`,
      emoji: '💌',
      active: !isMoodPath,
    },
  ]

  return (
    <div className="rounded-card border border-white/60 bg-white/70 p-1.5 shadow-sm">
      <div className="grid grid-cols-2 gap-1 text-sm font-semibold">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={tab.active ? 'page' : undefined}
            className={`rounded-card px-3 py-2 flex items-center justify-center gap-2 border transition text-base ${
              tab.active
                ? 'bg-white text-teal-900 border-white shadow'
                : 'text-slate-500 border-transparent hover:text-slate-900 hover:border-white/70'
            }`}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
