import jwt from "jsonwebtoken";

class TokenManager {
    async generateToken(username: string) {
        const refreshToken = jwt.sign({ username }, process.env.JWT_SECRET || "default-secret", { expiresIn: "1d" });

        return jwt.sign({ username, refreshToken }, process.env.JWT_SECRET || "default-secret");
    }

    async verifyToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || "default-secret");
        } catch (error) {
            return false;
        }
    }

    async getUserFromToken(token: string) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret");

        if (typeof decoded === "string") {
            return null;
        }

        return decoded.username;
    }
}

export default new TokenManager();