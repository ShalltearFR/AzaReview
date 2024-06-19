import dbConnect from "@/lib/dbConnect";
import PatchNote from "@/models/PatchNote.model";
import { NextResponse } from "next/server";
import NodeCache from "node-cache";

export const dynamic = "force-dynamic";

// Cache pour les données récupérées (TTL: 20 minutes)
const cache = new NodeCache({ stdTTL: 1200 });

export async function GET() {
  try {
    const cachedData = cache.get("changelog");
    if (cachedData) {
      return NextResponse.json({ status: 200, data: cachedData });
    }

    await dbConnect();
    const dataReq = await PatchNote.find({})
      .lean()
      .select("-_id -__v -updatedAt")
      .sort({ version: -1 });

    // Mettre en cache les données récupérées
    cache.set("changelog", dataReq);

    return NextResponse.json({ status: 200, data: dataReq });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 202 });
  }
}
