import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { KyselyAdapter } from '@auth/kysely-adapter'
import db from '@/lib/db'
import type { NextAuthOptions } from 'next-auth'
import { createUser } from '@/actions/users.actions'

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
          await createUser({ name: user.name!, uuid: user.id })
          return true
        } catch (error) {
          console.log('Create user Error', error)
          return false
        }
      } else {
        return false
      }
    },
    async session({ session, token }) {
      console.count('Session')

      session.user.id = token?.id
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
