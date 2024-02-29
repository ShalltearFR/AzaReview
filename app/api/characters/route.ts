import dbConnect from "@/lib/dbConnect";
import Character from "@/models/Character.model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const queryIds = searchParams.get("ids");
    const array = queryIds?.split(",");
    const dataReq: any = await Character.find({ id: { $in: array } })
      .select("-_id -__v")
      //.then((data: any) => NextResponse.json(data, { status: 200 }))
      //.catch(() => NextResponse.json({ error: true }, { status: 204 }));
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
