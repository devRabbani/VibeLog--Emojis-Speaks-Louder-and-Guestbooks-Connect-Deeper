import { createUser } from '@/actions/users.actions'
import GoogleProvider from 'next-auth/providers/google'

import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) {
        try {
          const id = await createUser({ name: user.name!, uuid: user.id! })
          user.user_id = id
          return true
        } catch (error) {
          console.log('Create user :', error)
          return false
        }
      } else {
        return false
      }
    },
    async session({ session, token }) {
      session.user.user_id = token?.user_id
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user_id = user.user_id
      }

      return token
    },
  },
}
