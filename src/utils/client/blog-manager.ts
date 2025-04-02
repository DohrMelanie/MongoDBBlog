import { BlogEntry, BlogEntryCreationData } from "@/models/blog";
import { BlogPostDto } from "@/models/dtos";

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
}

export default new BlogManager();
