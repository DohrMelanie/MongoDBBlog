import postManager from "@/utils/post-manager";
import query from "@/utils/query";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const { id } = await context.params;

    const user = await query.getUserFromToken(token!.value!);

    const post = await postManager.getPost(new ObjectId(id));

    if(post.author.toString() !== user?._id!.toString()) {
        return NextResponse.json({ message: "You are not allowed to delete this post" }, { status: 403 });
    }

    await postManager.deletePost(new ObjectId(id));

    return NextResponse.json({ message: "Post deleted" });
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const { id } = await context.params;

    const user = await query.getUserFromToken(token!.value!);

    const post = await postManager.getPost(new ObjectId(id));

    if(post.author.toString() !== user?._id!.toString()) {
        return NextResponse.json({ message: "You are not allowed to edit this post" }, { status: 403 });
    }

    const body = await request.json();

    const { title, content, category, description, commentsAllowed } = body;

    console.log(category);

    await postManager.updatePost(new ObjectId(id), { title, content, category, description, commentsAllowed });

    return NextResponse.json({ message: "Post updated" });
}