import { BlogPostDto } from "@/models/dtos";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Bin from "../icons/bin";

export default function PostSmall({ post, isDeleteAllowed = false }: { post: BlogPostDto, isDeleteAllowed: boolean }) {
    const router = useRouter();

    const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        
        const response = await fetch(`/api/v1/posts/${post._id}`, {
            method: "DELETE",
        });

        if(response.ok) {
            window.location.reload();
        }
    }

    return (
        <div onClick={() => router.push(`/posts/${post._id}`)} className="flex flex-row gap-2 w-full text-secondary-700 hover:bg-primary-100 p-4 rounded-md relative">
            <div className="flex flex-col gap-2 pr-10">
                <span className="text-sm text-secondary-500">{new Date(post.creationDate).toLocaleDateString()}</span>
                <h1 className="text-2xl font-bold justify-start items-center gap-1 flex">{post.title} ~ <Link href={`/profile/${post.author.username}`} onClick={(e) => e.stopPropagation()} className="text-sm text-secondary-500 italic text-center justify-center items-center cursor-pointer">@{post.author.username}</Link></h1>
                <p className="text-sm text-secondary-500">{post.description}</p>
            </div>
            <div className="flex flex-col gap-2 absolute right-4 top-4">
                <span className="text-sm text-secondary-500">{post.impressionCount} views</span>
            </div>
            <div className="flex flex-col gap-2 absolute right-4 bottom-4">
                {isDeleteAllowed && (
                    <button onClick={deleteHandler} className="text-sm text-secondary-500 bg-accent-100 hover:bg-accent-200 p-1 rounded-md"><Bin /></button>
                )}
            </div>
        </div>
    )
}