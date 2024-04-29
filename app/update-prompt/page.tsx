import UpdatePromptForm from "@/components/forms/update-prompt-form";
import { Suspense } from 'react'
// import {session} from "next-auth/core/routes";

const EditPrompt = () => {
    return (
            <Suspense>
                <UpdatePromptForm />
            </Suspense>
        )
};

export default EditPrompt;
