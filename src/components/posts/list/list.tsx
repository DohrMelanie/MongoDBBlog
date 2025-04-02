import PostSmall from "../post-small";
import ListSkeleton from "@/components/ui/flowbite/skeletons/list-skeleton";
import { BlogPostDto } from "@/models/dtos";

export default function PostList({ posts, isLoading, className }: { posts: BlogPostDto[], isLoading: boolean, className?: string }) {
    return (
        <div className={`flex flex-col gap-4 ${className} border border-primary-200 p-4 max-h-[500px]`}>
            {isLoading ? (
                <ListSkeleton />
            ) : (
                posts.map((post) => (
                    <PostSmall key={post._id!.toString()} post={post} />
                ))
            )}
        </div>
    )
}