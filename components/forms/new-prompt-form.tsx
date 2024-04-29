"use client"

import {FormEvent, useState} from 'react';
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation";
import Form from "@/components/forms/Form";
import {SessionUserType} from "@/lib/types";

const CreatePromptForm = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try{
            const SESSION = session as SessionUserType;
            const response = await fetch('/api/prompt/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: SESSION.user.id,
                        tag: post.tag
                    })
                })
            if (response.ok) {
                router.push('/')
            }
        }

        catch (error) {
            console.error(error)
        }
        finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePromptForm;
