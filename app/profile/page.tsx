"use client";
import { useSession } from "next-auth/react";
import {useEffect, useState} from "react";
import Profile from "@/components/Profile";
import {useRouter} from "next/navigation";
import  {PromptType} from "@/models/prompt";
import {SessionUserType} from "@/lib/types";



const MyProfile = () => {
    const router = useRouter()
    const {data : session} = useSession()
    const [posts, setPosts] = useState<PromptType[]>([]);

    useEffect(() => {
        const SESSION = session as SessionUserType;
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${SESSION.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        if (SESSION)
            if (SESSION.user.id) fetchPosts();
    }, [session?.user])

    const handleEdit = (post: PromptType) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post: PromptType) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            }
            catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalised profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;
