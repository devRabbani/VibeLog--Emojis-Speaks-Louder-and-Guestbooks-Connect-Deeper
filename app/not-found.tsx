import Link from 'next/link'
import Image from 'next/image'
import errorImg from '@/assets/404.svg'

export default function NotFound() {
  return (
    <div className="card-surface border border-white/70 flex-1 p-7 grid place-content-center text-center">
      <div className="mx-auto max-w-sm space-y-5 -mt-3">
        <Image src={errorImg} alt="Page not found" priority />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Oops
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            This page drifted away
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            The link you followed may be broken or the page may have been
            removed. Let’s head back and explore fresh vibes.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-card border border-teal-600/40 bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-700"
          >
            Back to home
          </Link>
          <Link
            href="/profile"
            className="rounded-card border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-400 hover:text-teal-900"
          >
            View profile
          </Link>
        </div>
      </div>
    </div>
  )
}
