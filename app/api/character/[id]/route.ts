import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import { NextResponse } from "next/server";
import cacheData from "@/utils/cacheData";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const cachedData = cacheData.get(`character${id}`);
    if (cachedData) return NextResponse.json(cachedData, { status: 200 });

    await dbConnect();
    const data = await Character.findOne({ id }).lean().select("-__v -_id");

    // Supprimer les _id des tableaux
    const cleanedData = removeIdsFromArrays(data);

    if (cleanedData) {
      // Mettre en cache les données récupérées
      cacheData.set(`character${id}`, cleanedData);
      return NextResponse.json(cleanedData, { status: 200 });
    }
    return NextResponse.json({ error: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true });
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
