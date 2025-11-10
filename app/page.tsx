import { getFeedVibes } from '@/actions/vibe.actions'
import VibesList from '@/components/VibesComps/VibesList'

export default async function Home() {
  const vibes = await getFeedVibes()

  return (
    <div className="card-surface feedHeight border border-white/70 p-7 pb-10">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4 gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Live moodboard
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">
            Recent Vibes
          </h3>
        </div>
        <span className="text-3xl">🌈</span>
      </div>
      <VibesList vibes={vibes} isFeed={true} />
    </div>
  )
}
