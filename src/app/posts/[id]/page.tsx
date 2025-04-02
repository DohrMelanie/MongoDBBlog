"use client";

import blogManager from "@/utils/client/blog-manager";
import { useEffect, useState } from "react";
import { BlogPostDto } from "@/models/dtos";
import { useParams } from "next/navigation";
import PostBig from "@/components/posts/post-big";
import BigBoxSkeleton from "@/components/ui/flowbite/skeletons/big-box-skeleton";

export default function PostPage() {
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<BlogPostDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        blogManager.getPost(id).then((post) => {
            setPost(post);
            
            setIsLoading(false);
        });
    }, [id]);

    return (
        <>
            {isLoading ? <BigBoxSkeleton className="w-2/3 h-full" /> : post && <PostBig post={post} />}
        </>
    )
}