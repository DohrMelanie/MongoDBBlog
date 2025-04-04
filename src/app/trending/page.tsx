"use client";

import ListSkeleton from "@/components/ui/flowbite/skeletons/list-skeleton";
import { PublicUserPostDetailsDto } from "@/models/dtos";
import { useEffect, useState } from "react";

export default function TrendingProfiles() {
  const [profiles, setProfiles] = useState<PublicUserPostDetailsDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
        const profiles = await fetch("/api/v1/users");
        const data = await profiles.json();
        setProfiles(data);
        console.log(data);

        setIsLoading(false);
    }
    console.log(profiles);

    fetchPosts();
  }, []);
  console.log(profiles);

  return (
    <>
      <h1 className="text-2xl font-bold text-secondary-700 tracking-wider">Trending Profiles</h1>
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <div className="flex flex-col gap-4 w-2/3 border border-primary-200 p-4">
          {profiles.map((profile) => (
            <div key={profile._id.toString()} className="flex items-center gap-4 p-2 hover:bg-primary-50 rounded">
              <img 
                src={"https://picsum.photos/200"} 
                alt={profile.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-secondary-700">{profile.username}</h3>
                {profile.posts !== undefined && (
                  <p className="text-sm text-secondary-500">{profile.posts.reduce((sum, post) => sum + post.impressionCount, 0)} Karma</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
