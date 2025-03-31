import { NextRequest, NextResponse } from "next/server";
import CodeManager from "@/utils/code-manager";
import TokenManager from "@/utils/token-manager";
import AuthManager from "@/utils/auth";
import { cookies } from "next/headers";
interface VerificationData {
    username: string;
    code: string;
}

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tokenPayload = await TokenManager.verifyToken(token.value);

    if (!tokenPayload) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(tokenPayload, { status: 200 });
}

export async function POST(request: NextRequest) {
    const { username, code } = await request.json() as VerificationData;

    const isCodeValid = await CodeManager.verifyCode(username, code);

    if (!isCodeValid) {
        return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    await CodeManager.deleteCode(username);
    
    const userData = await AuthManager.getUserDetails(username);

    console.log(userData);

    if (!userData) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!userData.isVerified) {
        await AuthManager.verifyUserAccount(username);
    }

    const token = await TokenManager.generateToken(username);

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    });

    return NextResponse.json({ message: "User verified successfully" }, { status: 200 });
}