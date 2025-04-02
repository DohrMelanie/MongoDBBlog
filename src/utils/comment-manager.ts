import db from "./mongo";
import { Comment } from "@/models/blog";
import { ObjectId } from "mongodb";
import { BlogEntry } from "@/models/blog";
import userManager from "./user-manager";
import { BlogPostDto, CommentDto } from "@/models/dtos";
class CommentManager {
    async createComment(text: string, postId: ObjectId, authorId: ObjectId) {
        const comment = await db.collection("Comments").insertOne({
            text,
            blogEntry: postId,
            author: authorId,
            createdAt: new Date()
        });
        return comment;
    }

    async getCommentsByPostId(postId: ObjectId) {
        const comments = await db.collection("Comments").find({ blogEntry: postId }).toArray();

        return comments as Comment[];
    }

    async deleteComment(commentId: ObjectId) {
        await db.collection("Comments").deleteOne({ _id: commentId });
    }

    async getCommentById(commentId: ObjectId) {
        const comment = await db.collection("Comments").findOne({ _id: commentId });
        return comment as Comment;
    }

    async generatePostsCommentsDto(posts: BlogEntry[]) : Promise<CommentDto[]> {
        const postsCommentsDto = await Promise.all(posts.map(async (post) => {
            const comments = await this.getCommentsByPostId(post._id!);
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

        return postsCommentsDto.flat();
    }
}

export default new CommentManager();
