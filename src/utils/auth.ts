import { UserCreationData, UserDetails } from "@/models/auth";
import db from "./mongo";
import { createHash } from "crypto";

class AuthManager {
    async addUser(user: UserCreationData) {
        const hash = createHash("sha256").update(user.password).digest("hex");

        await db.collection("users").insertOne({ username: user.username, password: hash, email: user.email, name: user.name, isVerified: false });
    }

    async verifyUserAccount(username: string) {
        await db.collection("users").updateOne({ username }, { $set: { isVerified: true } });
    }

    async verifyUser(username: string, password: string) {
        const user = await db.collection("users").findOne({ username });

        if (!user) {
            return false;
        }

        const hash = createHash("sha256").update(password).digest("hex");

        return user.password === hash;
    }

    async getUserDetails(username: string) : Promise<UserDetails | null> {
        return await db.collection("users").findOne({ username }, { projection: { password: 0 } }) as UserDetails | null;
    }
}

export default new AuthManager();