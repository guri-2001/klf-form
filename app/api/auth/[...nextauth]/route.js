import { connectMongoDB } from "../../../../lib/mongodb";
import Note from "../../../../models/addUser";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from 'bcryptjs'
// import GoogleProvider from "next-auth/providers/google";


const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},

            async authorize(credentials) {
                const { email } = credentials;

                try {
                    await connectMongoDB();
                    const user = await Note.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    // const passwordMatch = await bcrypt.compare(password, user.password);

                    // if (!passwordMatch) {
                    //     return null;
                    // }

                    return user;
                } catch (error) {
                    console.log("Error", error);
                }
            },
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
    ],
    callbacks : {

        async signIn({ user, account }){
            console.log("user", user);
            console.log("account", account);

            if(account.provider === 'google'){

                const { name, email } = user;

                try {
                    const res = await fetch('http://localhost:3000/api/register', {
                        method:'POST',
                        headers:{
                            Accept:"application/json" ,
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                            name,
                            email,
                        }),
                    });

                    if(res.ok){
                        return user;
                    }

                } catch (error) {
                    console.log(error);
                }
            }


            return user;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };