import EmailProvider from "next-auth/providers/email";
import { SanityAdapter } from "./adapter";
import { client } from '~/../sanity/lib/client';
import {
  type DefaultSession,
  type SessionStrategy
} from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    EmailProvider({
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          },
          from: process.env.EMAIL_FROM,
      }),
  ],
  adapter: SanityAdapter(client),
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    async redirect({ url, baseUrl }:{ url: string, baseUrl: string }) {
      // Always redirect to home page after sign in
      return baseUrl;
    },
  },
}
