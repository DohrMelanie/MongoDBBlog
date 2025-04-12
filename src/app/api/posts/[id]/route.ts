import postManager from "@/utils/post-manager";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { BlogPostDto } from "@/models/dtos";
import userManager from "@/utils/user-manager";
import commentManager from "@/utils/comment-manager";
import { cookies } from "next/headers";
import query from "@/utils/query";
import categoryManager from "@/utils/category-manager";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    
    try {
        const post = await postManager.getPost(new ObjectId(id as string));

        const author = await userManager.getUserById(post.author);

        const commentsDto = await commentManager.generatePostsCommentsDto([post]);

        const category = await categoryManager.getCategory(post.category);

        console.log(category);

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
            category: category?.name,
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

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const user = await query.getUserFromToken(token!.value);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if(user.viewedPosts.some(post => post.toString() === id as string)) {
        return NextResponse.json({ error: "User has already viewed this post" }, { status: 400 });
    }

    await postManager.addViewToPost(new ObjectId(id as string), user._id!);

    return NextResponse.json({ message: "View added" }, { status: 200 });
}