import { BlogEntryCreationData } from "@/models/blog";
import db from "./mongo";
import { UserDetails } from "@/models/auth";
import { ObjectId } from "mongodb";

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

    async getPost(id: string) {
        const post = await db.collection("BlogEntries").findOne({ _id: new ObjectId(id) });
        return post;
    }
}

export default new PostManager();