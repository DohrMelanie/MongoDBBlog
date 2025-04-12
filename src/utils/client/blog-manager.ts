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
            body: JSON.stringify(post)
        });
        return response.json() as Promise<BlogEntry>;
    }

    async createComment(postId: string, comment: string) {
        const response = await fetch(`/api/v1/posts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify({ comment })
        });
        return response.json() as Promise<CommentDto>;
    }

    async updatePost(postId: string, title: string, content: string, category: string, description: string, commentsAllowed: boolean) {
        const response = await fetch(`/api/v1/posts/${postId}`, {
            method: "PATCH",
            body: JSON.stringify({ title, content, category, description, commentsAllowed })
        });
        return response.json() as Promise<BlogEntry>;
    }
}

export default new BlogManager();
