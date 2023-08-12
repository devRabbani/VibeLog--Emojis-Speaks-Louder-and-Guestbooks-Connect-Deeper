import Subnav from '@/components/SubNav'
import Link from 'next/link'

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
