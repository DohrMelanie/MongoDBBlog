import { ObjectId } from "mongodb";
import db from "./mongo";
import { UserDetails } from "@/models/auth";

class UserManager {
    public async getUserById(id: ObjectId) {
        const user = await db.collection("BlogUsers").findOne({ _id: id });

        if (!user) {
            throw new Error("User not found");
        }

        return user as UserDetails;
    }

    public async getUserByUsername(username: string) {
        const user = await db.collection("BlogUsers").findOne({ username });

        if (!user) {
            throw new Error("User not found");
        }

        return user as UserDetails;
    }
}

const userManager = new UserManager();

export default userManager;