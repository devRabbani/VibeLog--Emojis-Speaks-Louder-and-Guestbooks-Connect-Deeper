import Subnav from '@/components/Layout/SubNav'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Subnav />
      {children}
    </>
  )
}
