import { MandatoryUserData, UserCreationData } from "@/models/auth";
import { NextResponse } from "next/server";
import AuthManager from "@/utils/auth";
import mailer from "@/utils/mailer";

export async function POST(request: Request) {
  const mandatoryUserData: MandatoryUserData = await request.json();

  const isUserVerified = await AuthManager.verifyUser(mandatoryUserData.username, mandatoryUserData.password);

  if (!isUserVerified) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const userData = await AuthManager.getUserDetails(mandatoryUserData.username);

  if (!userData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isEmailSent = await mailer.sendVerificationEmail(userData.username, userData.email);

  if (!isEmailSent) {
    return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 });
  }

  return NextResponse.json({ message: "Verification email sent successfully" }, { status: 200 });
}

export async function PUT(request: Request) {
  const userData: UserCreationData = await request.json();

  const user = await AuthManager.getUserDetails(userData.username);

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const isEmailSent = await mailer.sendVerificationEmail(userData.username, userData.email);

  if (!isEmailSent) {
    return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 });
  }

  await AuthManager.addUser(userData);

  return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}