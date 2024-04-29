import {Profile, Session} from "next-auth";

export interface ProfileType extends Omit<Profile, "image">{
    picture: string
}

export interface SessionUserType extends Omit<Session, "user"> {
    user: {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
    }
}