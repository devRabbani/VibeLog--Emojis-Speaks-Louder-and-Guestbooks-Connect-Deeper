import type { GuestMessagesType } from '@/types/utility'
import moment from 'moment'
import Link from 'next/link'
import MessagesBottomDiv from './MessagesBottomDiv'

type Props = {
  messages: GuestMessagesType[]
}

export default function MessagesList({ messages }: Props) {
  if (!messages?.length) {
    return (
      <p className="text-center mt-[15vh] text-lg text-slate-400">
        No one signed it yet. Be the first to drop a sweet note! 💌
      </p>
    )
  }

  return (
    <div>
      <MessagesMap messages={messages} />
      <MessagesBottomDiv messagesLength={messages?.length} />
    </div>
  )
}

export const MessagesMap = ({ messages }: Props) => {
  return messages.map((message, id) => (
    <MessageCard key={id} message={message} />
  ))
}

const MessageCard = ({ message }: { message: GuestMessagesType }) => {
  const currentDate = moment()
  const createdAt = moment(message.created_at)

  const difference = currentDate.diff(createdAt, 'hours')

  return (
    <div className="rounded-card border border-slate-200 bg-white px-4 py-3 mt-3 shadow-sm">
      <div className="flex items-baseline gap-2 flex-wrap">
        <Link
          className="font-semibold capitalize text-sm text-slate-800 hover:text-teal-800 underline-offset-4 hover:underline transition-colors"
          href={`/profile/${message.guest_id}`}
        >
          {message.name}
        </Link>
        <p className="text-slate-400 text-xs font-medium">
          {difference > 16
            ? createdAt.format('DD MMM, YY')
            : createdAt.fromNow()}
        </p>
      </div>

      <p className="mt-2 text-slate-700 text-sm leading-relaxed">
        {message.message}
      </p>
    </div>
  )
}
