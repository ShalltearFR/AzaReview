import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    let dataReq: any = await Character.find({})
      .select("-_id -__v")
      .then((data: Array<any>) => {
        return data;
      });
    if (dataReq.length === 0)
      return NextResponse.json({ status: 204, data: [] });
    dataReq = removeIdsFromArrays(dataReq);
    return NextResponse.json({ status: 200, data: dataReq });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 202 });
  }
}

// Fonction pour supprimer les _id des tableaux
function removeIdsFromArrays(data: any, visited = new Set()): any {
  // Si l'objet a déjà été visité, arrete la boucle et return data
  if (visited.has(data)) {
    return data;
  }

  // Ajoutez l'objet actuel à l'ensemble visité pour suivre les références circulaires
  visited.add(data);

  // Si l'objet est de type objet et n'est pas un tableau
  if (data && typeof data === "object" && !Array.isArray(data)) {
    // Vérifiez si l'objet actuel a une propriété "_id"
    if (data._id !== undefined) {
      // Supprimez la propriété "_id" de l'objet
      delete data._id;
    }

    // Appelez récursivement removeIds sur chaque valeur de propriété
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = removeIdsFromArrays(data[key], visited);
      }
    }
  } else if (Array.isArray(data)) {
    // Appelez récursivement removeIds pour chaque élément dans le tableau
    data = data.map((element: any) => removeIdsFromArrays(element, visited));
  }

  return data;
}
