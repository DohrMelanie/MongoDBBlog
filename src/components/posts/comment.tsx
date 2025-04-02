import { CommentDto } from "@/models/dtos";


export default function Comment({ comment }: { comment: CommentDto }) {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-secondary-700">{comment.author.username}</h1>
            <p className="text-secondary-500">{comment.text}</p>
        </div>
    )
}