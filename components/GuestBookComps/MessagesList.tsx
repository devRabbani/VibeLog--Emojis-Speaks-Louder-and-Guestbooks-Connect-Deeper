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
    <div className="bg-white/80 rounded-card px-4 py-3 mt-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)] border border-white">
      <div className="flex items-baseline gap-1 flex-wrap">
        <Link
          className="font-semibold capitalize text-xs text-slate-600"
          href={`/profile/${message.guest_id}`}
        >
          {message.name}
        </Link>
        <p className="text-slate-400 text-xs font-medium">
          {difference > 16
            ? `on ${createdAt.format('DD MMM, YY')}`
            : createdAt.fromNow()}
        </p>
      </div>

      <p className="mt-2 text-slate-800 text-sm leading-relaxed">
        {message.message}
      </p>
    </div>
  )
}
