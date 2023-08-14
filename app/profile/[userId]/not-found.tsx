import Image from 'next/image'
import Link from 'next/link'
import errorImg from '@/assets/404.svg'

export default function Notfound() {
  return (
    <div className="grid place-content-center bg-teal-700 mt-1 rounded-md shadow-sm profileHeight">
      <div className="flex flex-col items-center justify-center -mt-20 ">
        <Image src={errorImg} alt="Error" width={300} />
        <Link href="/">Go To Home</Link>
      </div>
    </div>
  )
}
