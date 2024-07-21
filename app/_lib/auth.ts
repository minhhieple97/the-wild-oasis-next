import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import env from '../_config/env';

export const authOptions = {
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authOptions);
