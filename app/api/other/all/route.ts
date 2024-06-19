import Other from "@/models/Other.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import NodeCache from "node-cache";

export const dynamic = "force-dynamic";

// Cache pour les données récupérées (TTL: 10 minutes)
const cache = new NodeCache({ stdTTL: 600 });

export async function GET(request: NextRequest) {
  try {
    const cachedData = cache.get("others");
    if (cachedData) {
      return NextResponse.json({ status: 200, data: cachedData });
    }

    await dbConnect();
    const others = await Other.findById("65f75a148f887c7586670036").select(
      "-__v -_id"
    );

    // Mettre en cache les données récupérées
    cache.set("others", others);

    return NextResponse.json({
      status: 200,
      data: others,
    });
  } catch (error: any) {
    return NextResponse.json({ errorMe: error.message }, { status: 400 });
  }
}
