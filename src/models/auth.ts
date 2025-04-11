import { ObjectId } from "mongodb";

export type BlogUser = {
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
    email: string;
    password: string;
    viewedPosts: ObjectId[];
}

export type MandatoryUserData = {
    username: string;
    password: string;
}

export type UserCreationData = {
    username: string;
    password: string;
    email: string;
    name: {
        firstname: string;
        lastname: string;
    };
}

export type UserDetails = {
    _id?: ObjectId;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
    email: string;
    isVerified: boolean;
    viewedPosts: ObjectId[];
}