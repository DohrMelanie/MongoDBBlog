import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/flowbite/form/button";
import Form from "../ui/flowbite/form/form";
import Input from "../ui/flowbite/form/input";
import blogManager from "@/utils/client/blog-manager";
import Spinner from "../ui/flowbite/spinner";

export default function EditComment({ commentId, initialComment, postId }: { commentId: string, initialComment: string, postId: string }) {
    const [comment, setComment] = useState(initialComment);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await blogManager.updateComment(commentId, comment, postId);
        setIsLoading(false);
        router.refresh();
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Form className="flex flex-col gap-2 justify-center items-center mb-8" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-secondary-700">Edit Comment</h1>
            <Input label="Comment" type="text" name="text" value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button type="submit">Save</Button>
        </Form>
    )
}