import { NextRequest, NextResponse } from "next/server";
import CategorySaver from "@/utils/category-saver";

export async function GET(request: NextRequest) {
    const categories = await CategorySaver.getAllCategories();
    return NextResponse.json(categories);
}