import { Timestamp } from '@/types/db'
import moment from 'moment'
import Link from 'next/link'
import LoadMoreVibes from './loadMoreVibes'
import { PAGE_LIMIT } from '@/lib/constant'
import VibesBottomBar from './VibesBottomBar'
import { VibesTypes } from '@/types/utility'

interface Props {
  vibes: VibesTypes[]
  isFeed: boolean
}

export default function VibesList({ vibes, isFeed }: Props) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4">
      <VibesMap vibes={vibes} />
      <VibesBottomBar vibesLength={vibes.length} isFeed={isFeed} />
    </div>
  )
}

export const VibesMap = ({ vibes }: { vibes: VibesTypes[] }) => {
  return vibes.map((vibe, i) => <VibeItem data={vibe} key={i} />)
}

const VibeItem = ({ data }: { data: VibesTypes }) => {
  return (
    <div className="text-7xl flex flex-col justify-center w-full text-center">
      <span className="mb-2">{data.emoji}</span>
      {!!data?.name ? (
        <Link
          href={`/profile/${data?.user_id?.toString()}`}
          className="text-xs font-medium capitalize break-words"
        >
          {data?.name}
        </Link>
      ) : null}
      <p className="text-[10px] opacity-80 mt-[1px]">
        {moment.utc(data.created_at).fromNow()}
      </p>
    </div>
  )
}
