import dbConnect from "@/lib/dbConnect";
import PatchNote from "@/models/PatchNote.model";
import cacheData from "@/utils/cacheData";
import { NextResponse } from "next/server";
import EditorChange from "@/models/EditorChange.model";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    await dbConnect();
    if (data.desc === "") {
      return NextResponse.json(
        { message: "no-desc", status: 204 },
        { status: 200 }
      );
    }

    EditorChange.create({
      author: data.user,
      comment: `Ajout de patch - ${data.version}`,
      edit: null,
    });

    PatchNote.create({ ...data });
    // Supprime le cache
    cacheData.del("changelog");

    return NextResponse.json({ status: 201, ...data }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}
