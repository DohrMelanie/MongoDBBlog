import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import commentManager from "@/utils/comment-manager";
import postManager from "@/utils/post-manager";
import { NextResponse } from "next/server";
import tokenManager from "@/utils/token-manager";
import { cookies } from "next/headers";
import query from "@/utils/query";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const { id } = await context.params;
    const { comment } = await request.json();

    const user = await query.getUserFromToken(token!.value!);

    const post = await postManager.getPost(new ObjectId(id));

    const commentDto = await commentManager.createComment(comment, post._id!, user?._id!);

    return NextResponse.json(commentDto);
}