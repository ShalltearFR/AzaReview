import dbConnect from "@/lib/dbConnect";
import PatchNote from "@/models/PatchNote.model";
import cacheData from "@/utils/cacheData";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cachedData = cacheData.get("changelog");
    if (cachedData) {
      return NextResponse.json({ status: 200, data: cachedData });
    }

    await dbConnect();
    const dataReq = await PatchNote.find({})
      .lean()
      .select("-_id -__v -updatedAt")
      .sort({ version: -1 });

    // Mettre en cache les données récupérées
    cacheData.set("changelog", dataReq);

    return NextResponse.json({ status: 200, data: dataReq });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 202 });
  }
}
