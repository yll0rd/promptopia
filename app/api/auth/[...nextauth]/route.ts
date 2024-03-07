import NextAuth, {Profile, Session} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/user'
import { connectToDB } from '@/utils/database';

interface ProfileType {
    email: string,
    name: string,
    picture: string
}

const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        async session ({session}: {
            session: Session
        }) {
            const sessionUser = await User.findOne({
                email: session?.user?.email
            })

            session.user.id = sessionUser._id.toString()

            return session;
        },
        async signIn ({ profile } : ProfileType) {
            try {
                await connectToDB()

                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                })

                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                console.log(userExists);

                return true
            } catch (error) {
                console.error(error.message)
                return false
            }
        }
    },
})

export { handler as GET, handler as POST }