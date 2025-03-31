import { MandatoryUserData, UserCreationData } from "@/models/auth";
import db from "@/utils/mongo";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  const mandatoryUserData: MandatoryUserData = await request.json();

  const user = await db.collection("users").findOne({ username: mandatoryUserData.username });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.password !== mandatoryUserData.password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default-secret");

  return NextResponse.json({ token });
}

export async function POST(request: Request) {
  const userData: UserCreationData = await request.json();

  const user = await db.collection("users").findOne({ username: userData.username });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = await db.collection("users").insertOne(userData);

  const token = jwt.sign({ id: newUser.insertedId }, process.env.JWT_SECRET || "default-secret");

  return NextResponse.json({ token });
}