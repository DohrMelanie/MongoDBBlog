"use client";

import { PublicUserPostDetailsDto } from "@/models/dtos";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import BigBoxSkeleton from "@/components/ui/flowbite/skeletons/big-box-skeleton";
import PostList from "@/components/posts/list/list";

export default function ProfilePage() {
    const params = useParams();
    const id = params.id as string;

    const [user, setUser] = useState<PublicUserPostDetailsDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setIsLoading(false);
            })
    }, [id]);

    if (isLoading) {
        return <BigBoxSkeleton className="w-2/3 h-full" />
    }

    return (
        <div className="flex flex-col gap-4 w-2/3 items-center h-full">
            <h1 className="text-2xl font-bold text-secondary-700 tracking-wider">Profile</h1>
            <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row gap-4">
                    <img src={"https://picsum.photos/200"} alt="Profile Picture" className="w-16 h-16 rounded-full" />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-secondary-700 tracking-wider">{user?.username}</h1>
                        <p className="text-sm text-secondary-500">{user?.name.firstname} {user?.name.lastname}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-secondary-700 tracking-wider">Last Posts:</h1>
                    <PostList posts={user?.posts ?? []} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}