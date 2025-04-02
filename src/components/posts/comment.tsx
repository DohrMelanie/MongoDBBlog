import { CommentDto } from "@/models/dtos";
import ChatBubble from "../ui/flowbite/chat-bubble";


export default function Comment({ comment }: { comment: CommentDto }) {
    return (
        <ChatBubble username={comment.author.username} timestamp={new Date(comment.creationDate).toLocaleString()} message={comment.text} />
    )
}