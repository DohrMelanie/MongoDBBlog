import commentManager from "@/utils/comment-manager";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import query from "@/utils/query";
import userManager from "@/utils/user-manager";

export async function DELETE(request: NextRequest, { params }: { params: { id: string, id2: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const { id, id2 } = await params;

    const user = await query.getUserFromToken(token!.value!);

    const userDetails = await userManager.getUserById(user!._id!);

    const comment = await commentManager.getCommentById(new ObjectId(id2));

    if(comment.author.toString() !== userDetails._id!.toString()) {
        return NextResponse.json({ message: "You are not allowed to delete this comment" }, { status: 403 });
    }

    await commentManager.deleteComment(new ObjectId(id2));
    
    return NextResponse.json({ message: "Comment deleted" });
}