import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import cacheData from "@/utils/cacheData";
import CharacterStats from "@/models/CharacterStats.model";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const cachedData: string | undefined = cacheData.get(`share${id}`);
  if (cachedData) {
    console.log("Cached data found");
    return NextResponse.json(JSON.parse(cachedData), { status: 200 });
  }

  try {
    await dbConnect();
    const data = await CharacterStats.findOne({ id })
      .lean()
      .select("-__v -_id");

    const cleanedData = removeIdsFromArrays(data);
    console.log(cleanedData);
    if (cleanedData) {
      cacheData.set(`share${id}`, JSON.stringify(cleanedData));
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
