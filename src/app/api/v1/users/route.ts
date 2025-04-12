import db from "@/utils/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // this is the query for the usern sorted by date
    const users = await db.collection("BlogUsers").find({}).sort({ username: 1 }).toArray();
    return NextResponse.json(users);
}