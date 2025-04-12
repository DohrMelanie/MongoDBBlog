import tokenManager from "./token-manager";
import db from "./mongo";
import { BlogUser, UserDetails } from "@/models/auth";
import { BlogEntry } from "@/models/blog";
import { ObjectId } from "mongodb";

class Query {
    async getAllBlogEntries() {
        const regular = await db.collection("BlogEntries").find().toArray();
        const popular = await db.collection("PopularBlogEntries").find().toArray();

        return [...regular, ...popular] as BlogEntry[];
    }

    async getUserFromToken(token: string): Promise<UserDetails | null> {
        const user = await tokenManager.getUserFromToken(token);
        return db.collection("BlogUsers").findOne({ username: user }) as unknown as UserDetails;
    }

    async getPostsByUserId(userId: ObjectId): Promise<BlogEntry[]> {
        const blogEntries = await db.collection("BlogEntries").find({ author: userId }).toArray();
        const popularEntries = await db.collection("PopularBlogEntries").find({ author: userId }).toArray();
        return [...blogEntries, ...popularEntries] as BlogEntry[];
    }

    async getNewestTwoPosts(): Promise<BlogEntry[]> {
        const allEntries = await this.getAllBlogEntries();
        return allEntries
            .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
            .slice(0, 2);

    }
    async getSecondOldestPost(): Promise<BlogEntry | null> {
        const allEntries = await this.getAllBlogEntries();
        return allEntries
            .sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime())[1] || null;
    }

    async getTitleInContentPosts(): Promise<BlogEntry[] | null> {
        const entries = await this.getAllBlogEntries();
        return entries.filter(e =>
            e.content?.toLowerCase().includes(e.title?.toLowerCase())
        );
    }

    async getMissingContentFieldPosts(): Promise<BlogEntry[] | null>  {
        const entries = await this.getAllBlogEntries();
        return entries.filter(e => !e.content);
    }

    async getContainsImagesPosts(): Promise<BlogEntry[] | null>  {
        const entries = await this.getAllBlogEntries();
        return entries.filter(e => /<img\b[^>]*>/i.test(e.content || ""));
    }

    async getMultipleImagesPosts(): Promise<BlogEntry[] | null>  {
        const entries = await this.getAllBlogEntries();
        return entries.filter(e => (e.content?.match(/<img\b[^>]*>/gi) || []).length > 1);
    }

    async getAuthorNameFilteredPosts(): Promise<BlogEntry[] | null>  {
        const entries = await this.getAllBlogEntries();
        const users = await db.collection("BlogUsers").find({
            $or: [
                { "name.lastname": /admin/i },
                { "name.lastname": { $not: /Guest/i } }
            ]
        }).toArray();
        const ids = users.map(u => u._id.toString());
        return entries.filter(e => ids.includes(e.author.toString()));
    }

    async getLastWeekWithLinkPosts(): Promise<BlogEntry[] | null>  {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const entries = await this.getAllBlogEntries();
        return entries.filter(e =>
            new Date(e.creationDate) >= oneWeekAgo &&
            /https?:\/\//i.test(e.content || "")
        );
    }
}

export default new Query();