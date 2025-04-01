import db from "./mongo";

class CategorySaver {
    async getAllCategories() {
        const categories = await db.collection("BlogCategories").find({}).toArray();
        return categories;
    }
}

export default new CategorySaver();