"use client"
import Image from "next/image";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {usePathname} from "next/navigation";
import {PromptType} from "@/models/prompt";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SessionUserType} from "@/lib/types";

// interface promptType extends Omit<PromptType, "creator"> {
//     creator: UserType
// }
interface PromptCardProps {
    post: PromptType,
    desc?: string,
    handleTagClick?: (value?: any) => void,
    handleEdit?: () => void,
    handleDelete?: () => void,
}

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete } : PromptCardProps) => {
    // console.log(post.creator)
    const [copied, setCopied] = useState('');
    const {data: session} = useSession()
    const SESSION = session as SessionUserType;
    const pathName = usePathname();

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000);
    }

    return (
        <div className='prompt_card'>
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    {/*<Image*/}
                    {/*    src={post?.creator?.image}*/}
                    {/*    alt="user_image"*/}
                    {/*    width={40}*/}
                    {/*    height={40}*/}
                    {/*    className="rounded-full object-contain"*/}
                    {/*></Image>*/}
                    <Avatar className="w-[40px] h-[40px]">
                        <AvatarImage src={post.creator?.image} />
                        <AvatarFallback>{post.creator?.username.slice(0,2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">{post?.creator?.username}</h3>
                        <p className="font-inter text-sm text-gray-500">{post?.creator?.email}</p>
                    </div>
                </div>

                <div className="copy_btn"
                     onClick={handleCopy}
                >
                    <Image
                        src={copied === post.prompt
                            ? '/assets/icons/tick.svg'
                            : '/assets/icons/copy.svg' }
                        width={12}
                        height={12}
                        alt='copy'
                    />
                </div>
            </div>

            <p className='my-3 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
            <p
                className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                #{post.tag}
            </p>
            {SESSION?.user.id === post.creator?._id &&
            pathName === '/profile' &&
                (
                    <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                        <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
                            Edit
                        </p>
                        <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
                            Delete
                        </p>
                    </div>
                )}
        </div>
    );
};

export default PromptCard;
