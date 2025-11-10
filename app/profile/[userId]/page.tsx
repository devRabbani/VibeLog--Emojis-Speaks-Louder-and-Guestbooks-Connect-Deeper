import { getUserData } from '@/actions/users.actions'
import { getUserVibes } from '@/actions/vibe.actions'
import AddVibeBtn from '@/components/AddVibeComps/AddVibeBtn'
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
    <div className="card-surface profileHeight border border-white/70 px-7 pt-5 pb-10 sm:relative">
      <div className="flex flex-col gap-3 mb-5 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Personal vibe stream
          </p>
          <p className="text-lg text-slate-900">
            Vibes of{' '}
            <span className="font-semibold capitalize">{userName}</span>
          </p>
        </div>
        <ShareBtn username={userName} user_id={userId} />
      </div>
      <VibesList vibes={vibesList} isFeed={false} />
      <AddVibeBtn paramsId={userId} />
    </div>
  )
}
