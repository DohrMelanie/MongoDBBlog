import { BlogEntryCreationData } from "@/models/blog";

class BlogManager {
    async getPosts() {
        const response = await fetch("/api/v1/posts");
        return response.json();
    }

    async getPost(id: string) {
        const response = await fetch(`/api/v1/posts/${id}`);
        return response.json();
    }

    async createPost(post: BlogEntryCreationData) {
        const response = await fetch("/api/v1/posts", {
            method: "POST",
            body: JSON.stringify(post)
        });
        return response.json();
    }
}

export default new BlogManager();
