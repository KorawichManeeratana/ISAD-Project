
import  NextAuth  from "next-auth/next"; 
import  CredentialsProvider  from "next-auth/providers/credentials";

const authOption = {
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {},
          async authorize(credentials, req) {
            const user = {id : "1"};
            return user;
          }
        })
      ],
      Session: {
        strategy: "jwt",
      },
      secret: process.env.NextAuth_SECRET,
      pages: {
        signIn : "/login"
      }
}

const handler = NextAuth(authOption);
export {handler as GET, handler as POST};