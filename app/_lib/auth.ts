import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import env from '../_config/env';
import { createGuest, getGuest } from './data-service';

export const authOptions = {
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: any }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: any }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session }: any) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authOptions);
