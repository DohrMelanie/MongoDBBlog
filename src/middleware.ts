import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import tokenManager from "./utils/token-manager";
import { JwtPayload } from "jsonwebtoken";
export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("token");

  if (!cookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await fetch(request.nextUrl.origin + "/api/auth/verify", {
    method: "GET",
    headers: {
      "Cookie": `token=${cookie.value}`
    }
  });

  const tokenData : JwtPayload = await token.json();

  if (!tokenData) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  if(typeof tokenData === "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if(tokenData.exp && tokenData.exp < Date.now() / 1000) {
    const refreshToken = await fetch(request.nextUrl.origin + "/api/auth/verify", {
      method: "GET",
      headers: {
        "Cookie": `token=${tokenData.refreshToken}`
      }
    });

    const refreshTokenData : JwtPayload = await refreshToken.json();

    if(!refreshTokenData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if(typeof refreshTokenData === "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if(refreshTokenData.exp && refreshTokenData.exp < Date.now() / 1000) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newToken = await tokenManager.generateToken(refreshTokenData.username);

    request.cookies.set("token", newToken);

    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/v1/:path*"
  ]
};