import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import query from "@/utils/query";
import { BlogPostDto } from "@/models/dtos";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const user = await query.getUserFromToken(token!.value);

    console.log(user);

    const posts = await query.getPostsByUserId(user!._id!);

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
        commentsAllowed: post.commentsAllowed
    }));

    return NextResponse.json(postsDto);
}