import { NextRequest, NextResponse } from "next/server";
import userManager from "@/utils/user-manager";
import { ObjectId } from "mongodb";
import { PublicUserDetailsDto, PublicUserPostDetailsDto } from "@/models/dtos";
import postManager from "@/utils/post-manager";
import commentManager from "@/utils/comment-manager";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    const user = await userManager.getUserByUsername(id);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const posts = await postManager.getPostsByUserId(user._id!);

    const publicUserPostDetails: PublicUserPostDetailsDto = {
        _id: user._id!,
        username: user.username,
        name: user.name,
        posts: await Promise.all(posts.map(async (post) => ({
            _id: post._id!,
            title: post.title,
            description: post.description,
            author: {
                _id: user._id!,
                username: user.username,
                name: user.name,
            },
            creationDate: post.creationDate,
            editDates: post.editDates,
            impressionCount: post.impressionCount,
            content: post.content,
            commentsAllowed: post.commentsAllowed,
            category: post.category,
            comments: await commentManager.generatePostsCommentsDto([post])
        })))
    }

    return NextResponse.json(publicUserPostDetails);
}