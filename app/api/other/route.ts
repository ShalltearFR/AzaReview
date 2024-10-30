import Other from "@/models/Other.model";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

// export async function POST(req: Request) {
//   try {
//     const { data } = await req.json();
//     await dbConnect();
//     Other.create({ ...data });
//     return NextResponse.json({ ...data }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: true }, { status: 204 });
//   }
// }

export async function PUT(req: Request) {
  try {
    const json = await req.json();
    await dbConnect();

    return Other.findByIdAndUpdate("65f75a148f887c7586670036", {
      ...json.data,
    }).then((data: any) => {
      return NextResponse.json({ message: "ok" }, { status: 200 });
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true }, { status: 204 });
  }
}
