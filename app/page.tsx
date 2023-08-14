import { getFeedVibes } from '@/actions/vibe.actions'
import VibesList from '@/components/VibesComps/VibesList'

export default async function Home() {
  const vibes = await getFeedVibes()

  return (
    <div className="bg-teal-700 rounded-md shadow-sm p-2 pb-4 feedHeight">
      <h3 className="text-lg border-b border-teal-800 opacity-80 pb-1">
        Recent Vibes
      </h3>
      <VibesList vibes={vibes} isFeed={true} />
    </div>
  )
}
