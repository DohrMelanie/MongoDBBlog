import { NextRequest, NextResponse } from "next/server";
import postManager from "@/utils/post-manager";
import { cookies } from "next/headers";
import Query from "@/utils/query";
import { BlogEntryCreationData } from "@/models/blog";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await Query.getUserFromToken(token.value);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const post: BlogEntryCreationData = await request.json();
        const createdPost = await postManager.createPost(post, user);
        
        return NextResponse.json(createdPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await Query.getUserFromToken(token.value);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { id, ...post } = await request.json();
        const updatedPost = await postManager.updatePost(new ObjectId(id), post);
        
        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
