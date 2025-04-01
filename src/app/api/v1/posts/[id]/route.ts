import postManager from "@/utils/post-manager";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    
    try {
        const post = await postManager.getPost(new ObjectId(id));
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
}