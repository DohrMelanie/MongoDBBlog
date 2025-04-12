import { ObjectId } from "mongodb";
import db from "./mongo";

class CategoryManager {
    async getCategoryById(id: ObjectId) {
        const category = await db.collection("BlogCategories").findOne({ _id: id });
    
        if (!category) {
            throw new Error("Category not found");
        }
    
        return category;
    }

    async getCategory(id: ObjectId) {
        const category = await db.collection("BlogCategories").findOne({ _id: id });

        return category;
    }
}

export default new CategoryManager();