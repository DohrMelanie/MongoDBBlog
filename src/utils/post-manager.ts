import { BlogEntry, BlogEntryCreationData } from "@/models/blog";
import db from "./mongo";
import { UserDetails } from "@/models/auth";
import { ObjectId } from "mongodb";

class PostManager {
    OUTLIER_THRESHOLD = 10;

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
        let post = await db.collection("BlogEntries").findOne({ _id: id });
        if (!post) {
            post = await db.collection("PopularBlogEntries").findOne({ _id: id });
        }
        return post as BlogEntry;
    }
    
    async deletePost(id: ObjectId) {
        const result = await db.collection("BlogEntries").deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            await db.collection("PopularBlogEntries").deleteOne({ _id: id });
        }
    }
    
    async getPostsByUserId(userId: ObjectId) {
        const normalPosts = await db.collection("BlogEntries").find({ author: userId }).toArray();
        const popularPosts = await db.collection("PopularBlogEntries").find({ author: userId }).toArray();
        return [...normalPosts, ...popularPosts] as BlogEntry[];
    }
    
    async getAllPosts(page: number = 1, pageSize: number = 5) {
        const skip = (page - 1) * pageSize;
    
        const normalPosts = await db.collection("BlogEntries")
            .find({})
            .skip(skip)
            .limit(pageSize)
            .toArray();
    
        const popularPosts = await db.collection("PopularBlogEntries")
            .find({})
            .skip(skip)
            .limit(pageSize)
            .toArray();
    
        return [...normalPosts, ...popularPosts] as BlogEntry[];
    }
    

    async addViewToPost(postId: ObjectId, userId: ObjectId) {
        await db.collection("BlogUsers").updateOne(
            { _id: userId },
            { $addToSet: { viewedPosts: postId } }
        );

        const updatedPost = await db.collection("BlogEntries").findOneAndUpdate(
            { _id: postId },
            { $inc: { impressionCount: 1 } },
            { returnDocument: "after" }
        );

        if (updatedPost && updatedPost.value.impressionCount > this.OUTLIER_THRESHOLD) {
            const alreadyMoved = await db.collection("PopularBlogEntries").findOne({ _id: postId });

            if (!alreadyMoved) {
                await db.collection("PopularBlogEntries").insertOne(updatedPost.value);
                await db.collection("BlogEntries").deleteOne({ _id: postId });
            }
        }
    }

    async updatePost(id: ObjectId, post: BlogEntryCreationData) {
        const category = await db.collection("BlogCategories").findOne({ name: post.category });

        if (!category) {
            throw new Error("Category not found");
        }

        await db.collection("BlogEntries").updateOne({ _id: id }, { $set: {
            ...post,
            category: category._id,
            editDates: [new Date()]
        } });
    }
}

export default new PostManager();