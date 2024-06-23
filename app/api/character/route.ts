import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Importez mongoose ici
import NodeCache from "node-cache";

// Cache pour les données récupérées (TTL: 20 minutes)
const cache = new NodeCache({ stdTTL: 1200 });

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    await dbConnect();
    await Character.create({ ...data });
    return NextResponse.json({ ...data }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await dbConnect();
    await Character.deleteOne({ id: id });
    return NextResponse.json({ message: "ok" }, { status: 202 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}

export async function PUT(req: any) {
  try {
    const json = await req.json();
    await dbConnect();

    const updatedData = await Character.findOneAndUpdate(
      { id: json.characterId },
      { data: json.data }
    ).exec();

    if (!updatedData) {
      return NextResponse.json({ error: true }, { status: 204 });
    }

    const cleanedData = await removeIdsFromArrays(updatedData.toObject());
    cache.set(`character${json.characterId}`, cleanedData);
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}

// Fonction pour supprimer les _id des objets
async function removeIdsFromArrays(
  data: any,
  seen = new WeakSet()
): Promise<any> {
  if (Array.isArray(data)) {
    return Promise.all(data.map((item) => removeIdsFromArrays(item, seen)));
  } else if (data && typeof data === "object" && !isMongooseObject(data)) {
    if (seen.has(data)) {
      return data;
    }
    seen.add(data);

    const { _id, __v, ...rest } = data;
    for (const key in rest) {
      rest[key] = await removeIdsFromArrays(rest[key], seen);
    }
    return rest;
  }
  return data;
}

// Vérifiez si l'objet est un objet Mongoose
function isMongooseObject(obj: any) {
  return obj instanceof mongoose.Document || obj instanceof mongoose.Model;
}
