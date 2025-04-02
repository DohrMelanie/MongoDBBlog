import db from "./mongo";
import { Comment } from "@/models/blog";
import { ObjectId } from "mongodb";
import { BlogEntry } from "@/models/blog";
import userManager from "./user-manager";
import { BlogPostDto, CommentDto } from "@/models/dtos";
class CommentManager {
    async createComment(commentParam: Comment) {
        const comment = await db.collection("comments").insertOne(commentParam);
        return comment;
    }

    async getCommentsByPostId(postId: ObjectId) {
        const comments = await db.collection("comments").find({ blogEntry: postId }).toArray();

        return comments as Comment[];
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
