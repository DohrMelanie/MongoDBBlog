import { NextRequest, NextResponse } from "next/server";
import postManager from "@/utils/post-manager";
import { BlogPostDto, CommentDto } from "@/models/dtos";
import userManager from "@/utils/user-manager";
import { BlogEntry } from "@/models/blog";
import commentManager from "@/utils/comment-manager";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "5");

  const posts: BlogEntry[] = await postManager.getAllPosts(page, pageSize);
  const validPosts = posts.filter(
    (post): post is BlogEntry & { _id: NonNullable<BlogEntry["_id"]> } =>
      post._id !== undefined
  );

  const postsDtos: BlogPostDto[] = (
    await Promise.all(
      validPosts.map(async (post) => {
        const author = await userManager.getUserById(post.author);
        if (!author?._id) return null;
        const comments = await commentManager.getCommentsByPostId(post._id);
        const validComments = await Promise.all(
          comments.map(async (comment) => {
            const commentAuthor = await userManager.getUserById(comment.author);
            if (!commentAuthor?._id) return null;
            return {
              _id: comment._id!,
              text: comment.text,
              author: {
                _id: commentAuthor._id,
                username: commentAuthor.username,
                name: commentAuthor.name,
              },
              creationDate: comment.createdAt,
            } as CommentDto;
          })
        );
        const filteredComments = validComments.filter(
          (comment): comment is CommentDto => comment !== null
        );

        return {
          _id: post._id,
          title: post.title,
          description: post.description,
          creationDate: post.creationDate,
          editDates: post.editDates,
          impressionCount: post.impressionCount,
          content: post.content,
          commentsAllowed: post.commentsAllowed,
          comments: filteredComments,
          author: {
            _id: author._id,
            username: author.username,
            name: author.name,
          },
        } as BlogPostDto;
      })
    )
  ).filter((post): post is BlogPostDto => post !== null);

  return NextResponse.json(postsDtos);
}
