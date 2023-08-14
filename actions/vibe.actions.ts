'use server'

import { PAGE_LIMIT } from '@/lib/constant'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const createVibe = async ({
  id,
  emoji,
}: {
  id: number
  emoji: string
}) => {
  try {
    await db
      .insertInto('Vibe')
      .values({ user_id: Number(id), emoji })
      .executeTakeFirst()
    revalidatePath('/profile/[userId]')
  } catch (error) {
    console.log('Creating vibe', error)
  }
}

export const getUserVibes = async (user_id: number) => {
  const results = await db
    .selectFrom('Vibe')
    .select(['created_at', 'emoji'])
    .where('user_id', '=', user_id)
    .orderBy('created_at', 'desc')
    .limit(PAGE_LIMIT)
    .execute()
  return results
}

export const getMoreVibes = async ({
  user_id,
  skip,
}: {
  user_id: string
  skip: number
}) => {
  const result = await db
    .selectFrom('Vibe')
    .select(['created_at', 'emoji'])
    .where('user_id', '=', Number(user_id))
    .orderBy('created_at', 'desc')
    .offset(skip)
    .limit(PAGE_LIMIT)
    .execute()

  return result
}

export const getFeedVibes = async () => {
  const result = await db
    .selectFrom('Vibe')
    .leftJoin('User', 'User.id', 'Vibe.user_id')
    .select(['created_at', 'user_id', 'emoji', 'User.name'])
    .orderBy('created_at', 'desc')
    .limit(PAGE_LIMIT)
    .execute()

  return result
}

export const getMoreFeedVibes = async (skip: number) => {
  const result = await db
    .selectFrom('Vibe')
    .leftJoin('User', 'User.id', 'Vibe.user_id')
    .select(['created_at', 'user_id', 'emoji', 'User.name'])
    .orderBy('created_at', 'desc')
    .offset(skip)
    .limit(PAGE_LIMIT)
    .execute()

  return result
}
