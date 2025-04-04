import db from "@/utils/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const users = await db.collection("BlogUsers").find({}).toArray();
    return NextResponse.json(users);
}