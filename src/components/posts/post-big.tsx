import { BlogPostDto } from "@/models/dtos";
import CommentsList from "./comments-list";
import FormModal from "../ui/flowbite/modal/form-modal";
import PostForm from "./edit/post-form";
import Edit from "../icons/edit";
import { useEffect, useState } from "react";
import Spinner from "../ui/flowbite/spinner";
import ContentRenderer from "./content-renderer";

export default function PostBig({ post }: { post: BlogPostDto }) {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoadingChild, setIsLoadingChild] = useState(true);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch("/api/v1/me");
                const data = await response.json();
                setUserId(data._id.toString());
                setIsLoadingChild(false);
            } catch (error) {
                setUserId("");
                setIsLoadingChild(false);
            }
        };

        fetchUserId();
    }, []);

    if(isLoadingChild) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col gap-4 text-secondary-700 w-1/2 h-full">
            {userId === post.author._id.toString() && (
                <FormModal title="" svg={<Edit />} className="absolute top-40 right-40">
                    <PostForm initialData={post} categories={[]} postId={post._id!.toString()} />
                </FormModal>
            )}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-center">{post.title}</h1>
                <p className="text-sm italic text-secondary-500 text-center">{post.description}</p>
            </div>
            <div className="flex flex-col gap-2 text-secondary-900">
                <div className="markdown-content h-full p-4">
                    <ContentRenderer content={post.content} />
                </div>
            </div>
            {post.commentsAllowed && (
                <CommentsList comments={post.comments} postId={post._id!.toString()} />
            )}
        </div>
    )
}