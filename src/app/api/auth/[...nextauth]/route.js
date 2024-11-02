import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth"; // Import for server-side session access if needed

const prisma = new PrismaClient();

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Login attempt with credentials:", credentials);

        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });

        console.log("Retrieved user from database:", user);

        if (user && bcrypt.compareSync(password, user.password)) {
          console.log("User authenticated:", user);
          return { id: user.id, email: user.email, name: user.name }; // Return a simplified user object
        }

        console.log("Authentication failed for user:", email);
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add user ID to the session object
      if (token.id) {
        session.user.id = token.id;
      }

      // Retrieve the userInfo record to check admin status
      const userInfo = await prisma.userInfo.findUnique({
        where: { email: session.user.email },
      });

      // Add admin status to the session object if userInfo exists
      session.user.isAdmin = userInfo?.admin || false;

      return session;
    },
    async jwt({ token, user }) {
      // Add the user ID to the token if it exists
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

// Helper function to check admin status
export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  console.log("Checking if user is admin:", userEmail);

  if (!userEmail) {
    return false;
  }

  const userInfo = await prisma.userInfo.findUnique({ where: { email: userEmail } });
  console.log("User info retrieved for admin check:", userInfo);

  return userInfo?.admin || false;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
