class CategoryManager {
    async getCategories() {
        const categories = await fetch("/api/v1/categories");
        const categoriesJson = await categories.json();

        return categoriesJson.map((category: any) => category.name);
    }
}

export default new CategoryManager();