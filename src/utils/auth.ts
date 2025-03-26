class AuthManager {
    validateMongo(id: string) {
        if (!id) {
            throw new Error("Invalid ID");
        }
    }
}

export default new AuthManager();