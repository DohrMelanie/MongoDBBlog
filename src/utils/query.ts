import tokenManager from "./token-manager";
import db from "./mongo";

class Query {
    async getUserFromToken(token: string) {
        const user = await tokenManager.getUserFromToken(token);

        console.log(user);

        return db.collection("users").findOne({ username: user });
    }
}

export default new Query();