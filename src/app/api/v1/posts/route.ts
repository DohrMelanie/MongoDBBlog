import { NextRequest, NextResponse } from "next/server";
import PostManager from "@/utils/post-manager";
import { cookies } from "next/headers";
import Query from "@/utils/query";
import { BlogEntryCreationData } from "@/models/blog";
import blogManager from "@/utils/client/blog-manager";

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const user = await Query.getUserFromToken(token!.value);

    const post : BlogEntryCreationData = await request.json();
    const createdPost = await PostManager.createPost(post, user!);
    
    return NextResponse.json(createdPost, { status: 201 });
}