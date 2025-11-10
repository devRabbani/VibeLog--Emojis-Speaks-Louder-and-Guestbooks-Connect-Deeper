import { getUserData } from '@/actions/users.actions'
import { getUserVibes } from '@/actions/vibe.actions'
import VibesList from '@/components/VibesComps/VibesList'
import ShareBtn from '@/components/VibesComps/shareBtn'

interface Props {
  params: {
    userId: string
  }
}

export const revalidate = 120

export default async function Profile({ params: { userId } }: Props) {
  const userNamePromise = getUserData(Number(userId))
  const vibesListPromise = getUserVibes(Number(userId))

  const [userName, vibesList] = await Promise.all([
    userNamePromise,
    vibesListPromise,
  ])

  return (
    <>
      <div className="flex gap-3 mb-5 border-b border-slate-200 pb-4 items-center justify-between sm:gap-4">
        <div className=''>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Personal vibe stream
          </p>
          <p className="text-lg text-slate-900 truncate">
            Vibes of{' '}
            <span className="font-semibold capitalize">{userName}</span>
          </p>
        </div>
        <ShareBtn username={userName} user_id={userId} />
      </div>
      <VibesList vibes={vibesList} isFeed={false} />
    </>
  )
}
