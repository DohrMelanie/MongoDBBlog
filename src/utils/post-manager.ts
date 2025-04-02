import { BlogEntry, BlogEntryCreationData } from "@/models/blog";
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

    async getPost(id: ObjectId) {
        const post = await db.collection("BlogEntries").findOne({ _id: id });
        return post as BlogEntry;
    }

    async deletePost(id: ObjectId) {
        await db.collection("BlogEntries").deleteOne({ _id: id });
    }
}

export default new PostManager();