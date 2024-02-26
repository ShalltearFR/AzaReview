import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    await dbConnect();
    Character.create({ ...data });
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
    return Character.deleteOne({ id: id }).then(() => {
      return NextResponse.json({ message: "ok" }, { status: 202 });
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}

export async function PUT(req: Request) {
  try {
    const json = await req.json();
    await dbConnect();
    console.log("json", json);

    return Character.findOneAndUpdate(
      { id: json.characterId },
      { data: json.data }
    ).then((data: any) => {
      console.log("mis a jour", data);
      return NextResponse.json({ message: "ok" }, { status: 200 });
    });

    //Character.create({ ...data });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}
