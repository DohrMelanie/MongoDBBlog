class AuthManager {
    validateMongo(id: string) {
        if (!id) {
            return false;
        }

        return true;
    }
}

export default new AuthManager();