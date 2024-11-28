import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {

          return { id: 1, name: "Usuário", email: "user@gmail.com" };

      },
    }),
  ],
  pages: {
    signIn: "/src/app/page.tsx",
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
