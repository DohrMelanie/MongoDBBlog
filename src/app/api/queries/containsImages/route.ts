import { BlogEntry } from "@/models/blog";
import query from "@/utils/query";
import { NextRequest, NextResponse } from "next/server";
import { GetDtoFromPosts } from "../../posts/route";

export async function GET() {
    const posts: BlogEntry[] | null = await query.getContainsImagesPosts();
    if (posts == null) {
        return NextResponse.error();
    }
    const validPosts: BlogEntry[] = posts.filter((post) => post._id !== undefined);
    return NextResponse.json(await GetDtoFromPosts(validPosts));
}