import { ObjectId } from "mongodb";
import db from "./mongo";
import { UserDetails } from "@/models/auth";

class UserManager {
    public async getUserById(id: ObjectId) {
        const user = await db.collection("users").findOne({ _id: id });

        if (!user) {
            throw new Error("User not found");
        }

        return user as UserDetails;
    }
}

const userManager = new UserManager();

export default userManager;