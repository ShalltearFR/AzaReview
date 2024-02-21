import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "Connected!" });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

export async function POST(request: Request) {
  // const data = await request.json();
  await dbConnect();
  try {
    User.create({
      username: "azano",
      password: "hashedPassword",
    });
    return NextResponse.json({ message: "Connected!" });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
