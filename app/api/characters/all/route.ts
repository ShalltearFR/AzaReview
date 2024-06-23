import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import { NextResponse } from "next/server";
import cacheData from "@/utils/cacheData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Vérifiez si les données sont en cache
    const cachedData = cacheData.get("characters");
    if (cachedData) {
      return NextResponse.json({ status: 200, data: cachedData });
    }

    await dbConnect();
    const dataReq = await Character.find({}).select("-_id -__v").lean();

    if (dataReq.length === 0)
      return NextResponse.json({ status: 204, data: [] });

    // Supprime les _id si nécessaire
    const cleanedData = removeIdsFromArrays(dataReq);

    // Mettre en cache les données récupérées
    cacheData.set("characters", cleanedData);

    return NextResponse.json({ status: 200, data: cleanedData });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}

// Fonction pour supprimer les _id des objets
function removeIdsFromArrays(data: any): any {
  if (Array.isArray(data)) {
    return data.map(removeIdsFromArrays);
  } else if (data && typeof data === "object") {
    const { _id, ...rest } = data;
    for (const key in rest) {
      rest[key] = removeIdsFromArrays(rest[key]);
    }
    return rest;
  }
  return data;
}
