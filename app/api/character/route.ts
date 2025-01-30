import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import EditorChange from "@/models/EditorChange.model";
import { NextResponse } from "next/server";
import cacheData from "@/utils/cacheData";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    await dbConnect();
    fetch(`/api/me`)
      .then((res) => res.json())
      .then((res) => {
        const user = res.data.username;

        EditorChange.create({
          author: user,
          comment: `Ajout de personnage - ${data.name}`,
          edit: null,
        });

        return Character.create({ ...data });
      })
      .then((data) => {
        return NextResponse.json({ ...data }, { status: 201 });
      })
      .catch((error) => {
        console.error("Error:", error);
        return NextResponse.json({ error: true }, { status: 204 });
      });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id, user } = await req.json();
    await dbConnect();

    // Supprime le cache
    cacheData.flushAll();

    EditorChange.create({
      author: user,
      comment: `Suppression du personnage - ID : ${id}`,
      edit: null,
    });

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

    // Supprime le cache
    cacheData.flushAll();

    const updatedData = await Character.findOneAndUpdate(
      { id: json.characterId },
      { data: json.data }
    ).exec();

    await EditorChange.create({
      author: json.user,
      comment: `Modification de personnage - ${json.characterName}`,
      edit: json.data,
    });

    if (!updatedData)
      return NextResponse.json({ error: true }, { status: 204 });

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}
