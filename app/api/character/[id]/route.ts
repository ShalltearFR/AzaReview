import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    await dbConnect();
    let data = await Character.findOne({ id }).lean().select("-__v -_id");

    // Supprimer les _id des tableaux
    data = removeIdsFromArrays(data);

    if (data) {
      return NextResponse.json(data, { status: 200 });
    }
    return NextResponse.json({ error: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true });
  }
}

// Fonction pour supprimer les _id des tableaux
function removeIdsFromArrays(data: any) {
  // Utilisez map pour parcourir les tableaux et supprimer les _id
  const removeIds = (item: any) => {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      Object.keys(item).forEach((key) => {
        if (key === "_id") {
          delete item[key];
        } else {
          removeIds(item[key]);
        }
      });
    } else if (Array.isArray(item)) {
      item.forEach(removeIds);
    }
    return item;
  };

  return removeIds(data);
}
