import { BlogEntryCreationData } from "@/models/blog";
import db from "./mongo";
import { UserDetails } from "@/models/auth";

class PostManager {
    async createPost(post: BlogEntryCreationData, user: UserDetails) {
        const category = await db.collection("BlogCategories").findOne({ name: post.category });

        if (!category) {
            throw new Error("Category not found");
        }

        const blogEntry = await db.collection("BlogEntries").insertOne({
            ...post,
            category: category._id,
            author: user._id,
            creationDate: new Date(),
            editDates: [],
            impressionCount: 0
        });
        
        return blogEntry;
    }
}

export default new PostManager();