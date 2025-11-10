import moment from 'moment'
import Link from 'next/link'
import VibesBottomBar from './VibesBottomBar'
import type { VibesTypes } from '@/types/utility'

interface Props {
  vibes: VibesTypes[]
  isFeed: boolean
}

export default function VibesList({ vibes, isFeed }: Props) {
  if (!vibes?.length) {
    return (
      <p className="text-center mt-[15vh] text-lg text-slate-400">
        No vibes yet — drop the first one! ✨
      </p>
    )
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4 sm:px-4">
      <VibesMap vibes={vibes} />
      <VibesBottomBar vibesLength={vibes.length} isFeed={isFeed} />
    </div>
  )
}

export const VibesMap = ({ vibes }: { vibes: VibesTypes[] }) => {
  return vibes.map((vibe, i) => <VibeItem data={vibe} index={i} key={i} />)
}

const accentText = ['text-teal-600', 'text-sky-500', 'text-emerald-600', 'text-cyan-600']

const VibeItem = ({ data, index }: { data: VibesTypes; index: number }) => {
  const textColor = accentText[index % accentText.length]

  return (
    <div
      className={`text-6xl sm:text-7xl flex flex-col items-center justify-between w-full text-center rounded-card px-4 py-6 transition-all duration-200 hover:shadow-[inset_0_14px_28px_rgba(15,23,42,0.08)]`}
    >
      <span className={`mb-3 drop-shadow-sm ${textColor}`}>{data.emoji}</span>
      {!!data?.name ? (
        <Link
          href={`/profile/${data?.user_id?.toString()}`}
          className="text-xs sm:text-sm font-semibold capitalize line-clamp-1 text-slate-700 transition-colors hover:text-teal-800 underline-offset-4 hover:underline"
        >
          {data?.name}
        </Link>
      ) : null}
      <p className="text-[11px] text-slate-500 mt-1">
        {moment.utc(data.created_at).fromNow()}
      </p>
    </div>
  )
}
