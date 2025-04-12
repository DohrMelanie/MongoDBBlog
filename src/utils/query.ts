import tokenManager from "./token-manager";
import db from "./mongo";
import { UserDetails } from "@/models/auth";
import { BlogEntry } from "@/models/blog";
import { ObjectId } from "mongodb";

class Query {
    async getUserFromToken(token: string) : Promise<UserDetails | null> {
        const user = await tokenManager.getUserFromToken(token);
        return db.collection("BlogUsers").findOne({ username: user }) as unknown as UserDetails;
    }

    async getPostsByUserId(userId: ObjectId): Promise<BlogEntry[]> {
        const blogEntries = await db.collection("BlogEntries").find({ author: userId }).toArray();
        const popularEntries = await db.collection("PopularBlogEntries").find({ author: userId }).toArray();
        return [...blogEntries, ...popularEntries] as BlogEntry[];
    }
}

export default new Query();