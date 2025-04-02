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

    async getPostsByUserId(userId: ObjectId) {
        const posts = await db.collection("BlogEntries").find({ author: userId }).toArray();
        return posts as BlogEntry[];
    }

    async getAllPosts(page: number = 1, pageSize: number = 5) {
        const skip = (page - 1) * pageSize;
        const posts = await db.collection("BlogEntries")
            .find({})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return posts as BlogEntry[];
    }
}

export default new PostManager();