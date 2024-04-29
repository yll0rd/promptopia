import {connectToDB} from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (req: Request) => {
    const data = await req.json()
    const { userId, prompt, tag } = data

    try{
        await connectToDB();
        const newPrompt = await Prompt.create({
            creator: userId,
            prompt,
            tag
        })
        debugger
        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        console.error(error)
        return new Response("Failed to create a anew prompt", { status: 500 })
    }
}