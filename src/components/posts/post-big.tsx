import { BlogEntry } from "@/models/blog";
import Markdown from "react-markdown";

export default function PostBig({ post }: { post: BlogEntry }) {
    return (
        <div className="flex flex-col gap-4 text-secondary-700 w-1/2 h-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-center">{post.title}</h1>
                <p className="text-sm text-secondary-500 text-center">{post.description}</p>
            </div>
            <div className="flex flex-col gap-2 text-secondary-900">
                <Markdown>{post.content}</Markdown>
            </div>
        </div>
    )
}