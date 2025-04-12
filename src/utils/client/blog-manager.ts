import { BlogEntry, BlogEntryCreationData } from "@/models/blog";
import { BlogPostDto, CommentDto } from "@/models/dtos";

class BlogManager {
    async getPosts() {
        const response = await fetch("/api/posts");
        return response.json() as Promise<BlogPostDto[]>;
    }

    async getPost(id: string) {
        const response = await fetch(`/api/posts/${id}`);
        return response.json() as Promise<BlogPostDto>;
    }

    async createPost(post: BlogEntryCreationData) {
        const response = await fetch("/api/v1/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...post,
                content: {
                    text: post.content.text,
                    images: post.content.images || []
                }
            })
        });
        return response.json() as Promise<BlogEntry>;
    }

    async createComment(postId: string, comment: string) {
        const response = await fetch(`/api/v1/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment })
        });
        return response.json() as Promise<CommentDto>;
    }

    async updatePost(id: string, post: BlogEntryCreationData) {
        const response = await fetch(`/api/v1/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...post,
                content: {
                    text: post.content.text,
                    images: post.content.images || []
                },
                description: post.content.text.substring(0, 255)
            })
        });

        console.log(response);

        return response.json() as Promise<BlogEntry>;
    }

    async updateComment(commentId: string, comment: string, postId: string) {
        const response = await fetch(`/api/v1/posts/${postId}/comments/${commentId}`, {
            method: "PATCH",
            body: JSON.stringify({ comment })
        });
        return response.json() as Promise<CommentDto>;
    }
}

export default new BlogManager();
