import { ObjectId } from "mongodb";

export interface BlogPostDto {
    _id: ObjectId;
    title: string;
    description: string;
    author: PublicUserDetailsDto;
    creationDate: Date;
    editDates: Date[];
    impressionCount: number;
    content: {
        [key: string]: any;
    };
    commentsAllowed: boolean;
    category: string;
    comments: CommentDto[];
}

export interface CommentDto {
    _id: ObjectId;
    text: string;
    author: PublicUserDetailsDto;
    creationDate: Date;
}

export interface PublicUserDetailsDto {
    _id: ObjectId;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
}

export interface PublicUserPostDetailsDto {
    _id: ObjectId;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
    posts: BlogPostDto[];
}