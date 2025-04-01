import { BlogEntry } from "@/models/blog";

export default function PostSmall({ post }: { post: BlogEntry }) {
    return (
        <div className="flex flex-col gap-2 w-full text-secondary-700 hover:bg-primary-100 p-4 rounded-md">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-sm text-secondary-500">{post.description}</p>
        </div>
    )
}