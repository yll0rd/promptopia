"use client"

import React, {FormEvent, useEffect, useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import Form from "@/components/forms/Form";

type PostType = {
    prompt: string,
    tag: string
}
const UpdatePromptForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState<PostType>({
        prompt: '',
        tag: ''
    })

    useEffect(() => {
        const getPromptDetails = async () : Promise<PostType> => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            return {
                prompt: data.prompt,
                tag: data.tag,
            }
        }

        if (promptId) getPromptDetails().then(setPost)
    }, [promptId]);

    const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert("Prompt ID not found")

        try{
            const response = await fetch(`/api/prompt/${promptId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
                })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default UpdatePromptForm;
