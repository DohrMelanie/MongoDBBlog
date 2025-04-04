import postManager from "@/utils/post-manager";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { BlogPostDto } from "@/models/dtos";
import userManager from "@/utils/user-manager";
import commentManager from "@/utils/comment-manager";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    
    try {
        const post = await postManager.getPost(new ObjectId(id as string));

        const author = await userManager.getUserById(post.author);

        const commentsDto = await commentManager.generatePostsCommentsDto([post]);

        const postDto: BlogPostDto = {
            _id: post._id!,
            title: post.title,
            description: post.description,
            author: {
                _id: author._id!,
                username: author.username,
                name: author.name
            },
            creationDate: post.creationDate,
            editDates: post.editDates,
            impressionCount: post.impressionCount,
            content: post.content,
            commentsAllowed: post.commentsAllowed,
            comments: commentsDto
        }

        return NextResponse.json(postDto, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    try {
        await postManager.deletePost(new ObjectId(id as string));
        return NextResponse.json({ message: "Post deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
}
