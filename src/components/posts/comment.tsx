import { useState } from "react";
import { CommentDto } from "@/models/dtos";
import ChatBubble from "../ui/flowbite/chat-bubble";
import EditComment from "./edit-comment";
import Modal from "../ui/flowbite/modal/modal";

export default function Comment({ comment, deleteAllowed, postId }: { comment: CommentDto, deleteAllowed: boolean, postId: string }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const deleteHandler = async () => {
        const response = await fetch(`/api/v1/posts/${postId}/comments/${comment._id}`, {
            method: "DELETE",
        });

        if(response.ok) {
            window.location.reload();
        }
    }

    const editHandler = () => {
        setIsEditModalOpen(true);
    }

    const closeModal = () => {
        setIsEditModalOpen(false);
    }

    return (
        <>
            <ChatBubble username={comment.author.username} timestamp={new Date(comment.creationDate).toLocaleString()} message={comment.text} deleteAllowed={deleteAllowed} onDelete={deleteHandler} onEdit={editHandler} />
            {isEditModalOpen && (
                <Modal onClose={closeModal}>
                    <EditComment commentId={comment._id.toString()} initialComment={comment.text} postId={postId} />
                </Modal>
            )}
        </>
    )
}