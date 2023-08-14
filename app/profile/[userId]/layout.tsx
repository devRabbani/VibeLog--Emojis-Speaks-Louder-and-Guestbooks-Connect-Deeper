import Subnav from '@/components/Layout/SubNav'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.count('Laout profile')
  return (
    <>
      <Subnav />
      {children}
    </>
  )
}
