import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/user'
import { connectToDB } from '@/utils/database';
import {ProfileType, SessionUserType} from '@/lib/types';


const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        session: async function ({session}) {
            const SESSION = session as SessionUserType;
            if (SESSION.user) {
                const sessionUser = await User.findOne({
                    email: SESSION.user.email as string
                });

                if (sessionUser)
                    SESSION.user.id = sessionUser._id.toString();
            }

            return SESSION;
        },
        async signIn ({ profile }) {
            const PROFILE = profile as ProfileType;
            try {
                await connectToDB()

                // check if a user already exists
                const userExists = await User.findOne({
                    email: PROFILE?.email
                })

                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: PROFILE?.email,
                        username: PROFILE?.name?.replace(" ", "").toLowerCase(),
                        image: PROFILE?.picture
                    })
                }

                return true
            } catch (error: any) {
                console.log("Error")
                console.error(error.message)
                return false
            }
        }
    },
})

export { handler as GET, handler as POST }