import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    const dataReq: any = await Character.find({})
      .select("-_id -__v")
      .then((data: Array<any>) => {
        return data;
      });
    if (dataReq.length === 0)
      return NextResponse.json({ status: 204, data: [] });
    return NextResponse.json({ status: 200, data: dataReq });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 202 });
  }
}
