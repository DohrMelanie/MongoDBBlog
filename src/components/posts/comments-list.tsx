import { CommentDto } from "@/models/dtos";
import Comment from "./comment";
import CommentCreation from "./comment-creation";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "../ui/flowbite/spinner";

export default function CommentsList({ comments, postId }: { comments: CommentDto[], postId: string }) {
    const [myId, setMyId] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyId = async () => {
            try {
                const response = await fetch(`/api/v1/me`);
                const data = await response.json();
                setMyId(data._id);
            } catch (error) {
                setMyId(null);
            }
        };
        
        fetchMyId();
    }, []);


    if(myId === null) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col gap-4 w-full justify-start">
            <h1 className="text-2xl font-bold text-secondary-700">Comments</h1>
            {comments.map((comment) => (
                <Comment key={comment._id.toString()} comment={comment} deleteAllowed={myId === comment.author._id.toString()} postId={postId} />
            ))}
            <CommentCreation postId={postId} />
        </div>
    )
}