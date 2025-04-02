import { CommentDto } from "@/models/dtos";
import Comment from "./comment";
import CommentCreation from "./comment-creation";

export default function CommentsList({ comments, postId }: { comments: CommentDto[], postId: string }) {
    return (
        <div className="flex flex-col gap-4 w-full justify-start">
            <h1 className="text-2xl font-bold text-secondary-700">Comments</h1>
            {comments.map((comment) => (
                <Comment key={comment._id.toString()} comment={comment} />
            ))}
            <CommentCreation postId={postId} />
        </div>
    )
}