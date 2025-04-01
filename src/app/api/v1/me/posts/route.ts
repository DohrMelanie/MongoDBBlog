import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import query from "@/utils/query";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const user = await query.getUserFromToken(token!.value);

    const posts = await query.getPostsByUserId(user!._id!);

    return NextResponse.json(posts);
}