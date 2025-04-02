import { NextRequest, NextResponse } from "next/server";
import userManager from "@/utils/user-manager";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
        const user = await userManager.getUserById(new ObjectId(id));

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
}