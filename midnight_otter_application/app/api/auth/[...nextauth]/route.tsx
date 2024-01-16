import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import { SiweMessage } from "siwe";

interface RouteHandlerContext {
  params: { nextauth: string[] };
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const auth = async (req: NextRequest, res: RouteHandlerContext) => {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(
            process.env.NEXTAUTH_URL ?? "http://localhost:3000"
          );

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
          });

          if (result.success) {
            //TODO: ajeje
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (e) {
          console.warn("Errore sign-in", e);
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && (res.params?.nextauth?.includes("signin") ?? false);

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        session.address = token.sub;
        session.user.name = token.sub;
        session.user.image = "https://www.fillmurray.com/128/128";
        return session;
      },
    },
  });
};

export { auth as GET, auth as POST };
