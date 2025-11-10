import Spinner from '@/components/spinner'

export default function Loading() {
  return (
    <div className="grid place-content-center flex-1 card-surface border border-white/70">
      <div className="flex flex-col items-center gap-3 justify-center -mt-16">
        <Spinner color="light" size={60} />
        <p className="opacity-50 text-sm sm:text-base">
          Getting data Please wait
        </p>
      </div>
    </div>
  )
}
