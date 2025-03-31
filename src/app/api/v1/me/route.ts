import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Query from "@/utils/query";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const user = await Query.getUserFromToken(token!.value);

    return NextResponse.json(user);
}