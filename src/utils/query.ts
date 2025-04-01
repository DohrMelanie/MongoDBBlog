import tokenManager from "./token-manager";
import db from "./mongo";
import { UserDetails } from "@/models/auth";
class Query {
    async getUserFromToken(token: string) : Promise<UserDetails | null> {
        const user = await tokenManager.getUserFromToken(token);

        return db.collection("users").findOne({ username: user }) as unknown as UserDetails;
    }
}

export default new Query();