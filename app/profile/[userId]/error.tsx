'use client'

import Image from 'next/image'
import Link from 'next/link'

import errorImg from '@/assets/error.svg'

export default function error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const message = error.message || 'Something went wrong'

  return (
    <section className="mx-auto flex max-w-sm flex-col items-center gap-6 sm:mt-5 text-center">
        <Image
          src={errorImg}
          alt="Something went wrong"
          priority
          className="w-44 max-w-full"
        />

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Heads up
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            Oops, the vibes got lost
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {message.charAt(0).toUpperCase() + message.slice(1)}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-card border border-teal-600/40 bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-card border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-400 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200/50"
          >
            Back Home
          </Link>
        </div>
    </section>
  )
}
