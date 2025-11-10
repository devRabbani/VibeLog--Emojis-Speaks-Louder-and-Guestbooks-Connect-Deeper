import Subnav from '@/components/Layout/SubNav'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="card-surface profileHeight border border-white/70 p-7 pb-10 sm:relative">
      <div className="mb-6">
        <Subnav />
      </div>
      {children}
    </div>
  )
}
