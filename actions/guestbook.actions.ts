'use server'

import { PAGE_LIMIT, PAGE_LIMIT_GUEST } from '@/lib/constant'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const addGuestMessage = async ({
  message,
  user_id,
  guest_id,
}: {
  message: string
  user_id: number
  guest_id: number
}) => {
  await db
    .insertInto('Guestbook')
    .values({
      guest_id,
      user_id,
      message,
    })
    .executeTakeFirstOrThrow()
  revalidatePath(`/profile/${user_id}/guestbook`)
}

export const getGuestMessages = async (user_id: number) => {
  const results = await db
    .selectFrom('Guestbook')
    .leftJoin('User', 'Guestbook.guest_id', 'User.id')
    .select(['User.name', 'created_at', 'message', 'guest_id'])
    .where('user_id', '=', user_id)
    .orderBy('created_at', 'desc')
    .limit(PAGE_LIMIT_GUEST)
    .execute()
  return results
}

export const getMoreMessages = async ({
  user_id,
  skip,
}: {
  user_id: number
  skip: number
}) => {
  const results = await db
    .selectFrom('Guestbook')
    .leftJoin('User', 'Guestbook.guest_id', 'User.id')
    .select(['User.name', 'created_at', 'message', 'guest_id'])
    .where('user_id', '=', user_id)
    .orderBy('created_at', 'desc')
    .offset(skip)
    .limit(PAGE_LIMIT_GUEST)
    .execute()

  return results
}
