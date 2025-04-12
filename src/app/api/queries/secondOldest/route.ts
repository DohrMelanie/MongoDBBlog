import { BlogEntry } from "@/models/blog";
import query from "@/utils/query";
import { NextRequest, NextResponse } from "next/server";
import { GetDtoFromPosts } from "../../posts/route";

export async function GET() {
    const post: BlogEntry | null = await query.getSecondOldestPost();
    if (post == null || post._id == null) {
        return NextResponse.error();
    }
    return NextResponse.json(await GetDtoFromPosts([post]));
}