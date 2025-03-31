import db from "./mongo";

class CodeManager {
    async generateCode(username: string) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await db.collection("codes").insertOne({ username, code });

        return code;
    }

    async verifyCode(username: string, code: string) {
        const result = await db.collection("codes").findOne({ username, code });

        return result !== null;
    }

    async deleteCode(username: string) {
        await db.collection("codes").deleteOne({ username });
    }
}

export default new CodeManager();