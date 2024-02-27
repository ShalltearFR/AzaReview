import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";

export async function GET() {
  try {
    await dbConnect();
    const data = await Character.find({}).select("-_id -__v");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}
