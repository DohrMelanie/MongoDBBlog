"use client";

import blogManager from "@/utils/client/blog-manager";
import { useEffect, useState } from "react";
import { BlogEntry } from "@/models/blog";
import { useParams } from "next/navigation";

export default function PostPage() {
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<BlogEntry | null>(null);
    useEffect(() => {
        blogManager.getPost(id).then((post) => {
            setPost(post);
        });
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">{post?.title}</h1>
            <p className="text-sm text-gray-500">{post?.description}</p>
            <p className="text-sm text-gray-500">{post?.content}</p>
        </div>
    )
}