import { BlogPostDto } from "@/models/dtos";
import { useRouter } from "next/navigation";

export default function PostSmall({ post }: { post: BlogPostDto }) {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/posts/${post._id}`)} className="flex flex-row gap-2 w-full text-secondary-700 hover:bg-primary-100 p-4 rounded-md relative">
            <div className="flex flex-col gap-2">
                <span className="text-sm text-secondary-500">{new Date(post.creationDate).toLocaleDateString()}</span>
                <h1 className="text-2xl font-bold justify-start items-center gap-1 flex">{post.title} ~ <span className="text-sm text-secondary-500 italic text-center justify-center items-center">{post.author.username}</span></h1>
                <p className="text-sm text-secondary-500">{post.description}</p>
            </div>
            <div className="flex flex-col gap-2 absolute right-4 top-4">
                <span className="text-sm text-secondary-500">{post.impressionCount} views</span>
            </div>
        </div>
    )
}