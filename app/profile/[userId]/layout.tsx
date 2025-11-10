import Subnav from '@/components/Layout/SubNav'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="card-surface flex flex-col flex-1 border border-white/70 p-6 pt-7 pb-7 sm:relative">
      <div className="mb-6">
        <Subnav />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
