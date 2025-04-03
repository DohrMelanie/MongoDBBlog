import { ObjectId } from "mongodb";
import db from "./mongo";

class CategorySaver {
    async getAllCategories() {
        const categories = await db.collection("BlogCategories").find({}).toArray();
        return categories;
    }
}
ObjectId
export default new CategorySaver();