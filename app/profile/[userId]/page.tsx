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

export default async function Profile({ params: { userId } }: Props) {
  const userNamePromise = getUserData(Number(userId))
  const vibesListPromise = getUserVibes(Number(userId))

  const [userName, vibesList] = await Promise.all([
    userNamePromise,
    vibesListPromise,
  ])

  return (
    <div className="bg-teal-700 mt-1 rounded-md shadow-sm p-3 pb-4 profileHeight">
      <div className="flex justify-between gap-1 mb-2 border-b border-teal-800 pb-2 items-center">
        <p>
          Vibes of <span className="font-semibold capitalize">{userName}</span>
        </p>
        <ShareBtn username={userName} user_id={userId} />
      </div>
      <VibesList vibes={vibesList} isFeed={false} />
      <AddVibeBtn paramsId={userId} />
    </div>
  )
}
