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

    if (data) {
      cacheData.set(`share${id}`, JSON.stringify(data));
      return NextResponse.json(data, { status: 200 });
    }
    return NextResponse.json({ error: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true });
  }
}
