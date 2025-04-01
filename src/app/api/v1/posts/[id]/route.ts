import blogManager from "@/utils/client/blog-manager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    
    try {
        const post = await blogManager.getPost(id);
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
}