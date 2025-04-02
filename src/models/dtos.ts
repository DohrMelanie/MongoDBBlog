import { ObjectId } from "mongodb";

export interface BlogPostDto {
    _id: ObjectId;
    title: string;
    description: string;
    author: PublicUserDetailsDto;
    creationDate: Date;
    editDates: Date[];
    impressionCount: number;
    content: string;
    commentsAllowed: boolean;
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