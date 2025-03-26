export type BlogUser = {
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
    email: string;
    password: string;
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