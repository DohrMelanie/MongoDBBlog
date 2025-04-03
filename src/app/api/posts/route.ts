import { NextRequest, NextResponse } from "next/server";
import postManager from "@/utils/post-manager";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '5');

    const posts = await postManager.getAllPosts(page, pageSize);
    return NextResponse.json(posts);
}