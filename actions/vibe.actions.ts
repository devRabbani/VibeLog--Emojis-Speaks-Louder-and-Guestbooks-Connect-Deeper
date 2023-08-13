'use server'

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

export const getUserVibes = async (user_id: string) => {
  const results = await db
    .selectFrom('Vibe')
    .select(['created_at', 'emoji'])
    .where('user_id', '=', Number(user_id))
    .orderBy('created_at', 'desc')
    .execute()
  return results
}
