import dbConnect from "@/lib/dbConnect";
import PatchNote from "@/models/PatchNote.model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const dataReq = await PatchNote.find({})
      .select("-_id -__v -updatedAt")
      .sort({ version: -1 });

    return NextResponse.json({ status: 200, data: dataReq });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 202 });
  }
}
