'use client'

import Image from 'next/image'
import errorImg from '@/assets/error.svg'

export default function error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="grid place-content-center bg-teal-700 mt-1 rounded-md shadow-sm profileHeight">
      <div className="flex flex-col items-center justify-center -mt-20 ">
        <Image src={errorImg} alt="Error" width={200} className="opacity-70" />
        <p className="opacity-50 text-sm capitalize sm:text-base">
          {error.message || 'Something Went wrong'}
        </p>
        <button className="mt-2 text-sm" onClick={reset}>
          Try Again
        </button>
      </div>
    </div>
  )
}
