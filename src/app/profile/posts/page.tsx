"use client";

import { BlogPostDto } from "@/models/dtos";
import { useEffect, useState } from "react";
import PostList from "@/components/posts/list/list";

export default function ProfilePosts() {
    const [posts, setPosts] = useState<BlogPostDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await fetch("/api/v1/me/posts");
            const data = await posts.json();
            setPosts(data);

            console.log(data);

            setIsLoading(false);
        }

        fetchPosts();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold text-secondary-700 tracking-wider">Your Last Posts</h1>
            <PostList posts={posts} isLoading={isLoading} className="w-2/3" />
        </>
    )
}