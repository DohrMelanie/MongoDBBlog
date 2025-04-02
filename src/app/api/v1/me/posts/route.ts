import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import query from "@/utils/query";
import { BlogPostDto } from "@/models/dtos";
import commentManager from "@/utils/comment-manager";
import userManager from "@/utils/user-manager";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const user = await query.getUserFromToken(token!.value);

    const posts = await query.getPostsByUserId(user!._id!);
    
    const comments = await Promise.all(posts.map(async (post) => {
        const comments = await commentManager.getCommentsByPostId(post._id!);
        const commentsDto = await Promise.all(comments.map(async (comment) => {
            const author = await userManager.getUserById(comment.author);
            return {
                _id: comment._id!,
                text: comment.text,
                author: {
                    _id: author!._id!,
                    username: author!.username,
                    name: author!.name
                },
                creationDate: comment.createdAt
            }
        }));
        return commentsDto;
    }));

    const postsDto: BlogPostDto[] = posts.map((post) => ({
        _id: post._id!,
        title: post.title,
        description: post.description,
        author: {
            _id: user!._id!,
            username: user!.username,
            name: user!.name
        },
        creationDate: post.creationDate,
        editDates: post.editDates,
        impressionCount: post.impressionCount,
        content: post.content,
        commentsAllowed: post.commentsAllowed,
        comments: comments.flat()
    }));

    return NextResponse.json(postsDto);
}