import { useEffect, useState } from "react";
import Button from "../ui/flowbite/form/button";
import Form from "../ui/flowbite/form/form";
import Input from "../ui/flowbite/form/input";
import Spinner from "../ui/flowbite/spinner";
import blogManager from "@/utils/client/blog-manager";
import Link from "next/link";

export default function CommentCreation({ postId }: { postId: string }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const ping = async () => {
            const res = await fetch("/api/auth/verify");
            if (res.ok) {
                setIsLoggedIn(true);
            }

            setIsLoading(false);
        }

        ping();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    if (!isLoggedIn) {
        return <div className="flex flex-row gap-2 justify-center items-center mb-8">
            In order to comment, you need to be logged in.
            <Link href="/auth" className="text-blue-500">Login</Link>
        </div>;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        blogManager.createComment(postId, comment);
    }

    return (
        <Form className="flex flex-row gap-2 justify-center items-center" onSubmit={handleSubmit}>
            <Input label="Comment" type="text" name="text" value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button type="submit">Post</Button>
        </Form>
    )
}