import { CommentDto } from "@/models/dtos";
import ChatBubble from "../ui/flowbite/chat-bubble";


export default function Comment({ comment, deleteAllowed, postId }: { comment: CommentDto, deleteAllowed: boolean, postId: string }) {
    const deleteHandler = async () => {
        const response = await fetch(`/api/v1/posts/${postId}/comments/${comment._id}`, {
            method: "DELETE",
        });

        if(response.ok) {
            window.location.reload();
        }
    }

    return (
        <ChatBubble username={comment.author.username} timestamp={new Date(comment.creationDate).toLocaleString()} message={comment.text} deleteAllowed={deleteAllowed} onDelete={deleteHandler} />
    )
}