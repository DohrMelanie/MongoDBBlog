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

    async getPostsByUserId(userId: ObjectId) : Promise<BlogEntry[]> {
        return db.collection("BlogEntries").find({ author: userId }).toArray() as unknown as BlogEntry[];
    }
}

export default new Query();