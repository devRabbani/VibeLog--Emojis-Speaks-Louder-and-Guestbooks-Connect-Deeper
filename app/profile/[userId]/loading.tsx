import Spinner from '@/components/spinner'

export default function Loading() {
  return (
    <div className="mt-20 sm:mt-28">
      <div className='mx-auto w-fit'>
        <Spinner color="light" size={50} />
      </div>
    </div>
  )
}
