import PostSmall from "../post-small";
import ListSkeleton from "@/components/ui/flowbite/skeletons/list-skeleton";
import { BlogPostDto } from "@/models/dtos";
import { useState } from "react";

export default function PostList({ posts, isLoading, className, isPaging = false }: { posts: BlogPostDto[], isLoading: boolean, className?: string, isPaging?: boolean }) {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const paginatedPosts = isPaging ? posts.slice((page - 1) * pageSize, page * pageSize) : posts;
    const totalPages = isPaging ? Math.ceil(posts.length / pageSize) : 1;
    
    return (
        <div className={`flex flex-col gap-4 ${className} border border-primary-200 p-4 max-h-[500px]`}>
            {isLoading ? (
                <ListSkeleton />
            ) : (
                <>
                    {paginatedPosts.map((post) => (
                        <PostSmall key={post._id!.toString()} post={post} />
                    ))}
                    {isPaging && totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 bg-primary-100 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-3 py-1 bg-primary-100 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}