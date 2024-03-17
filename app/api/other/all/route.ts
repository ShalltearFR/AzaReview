import Other from "@/models/Other.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const other = await Other.findById("65f75a148f887c7586670036").select(
      "-__v -_id"
    );
    return NextResponse.json({
      status: 200,
      data: other,
    });
  } catch (error: any) {
    return NextResponse.json({ errorMe: error.message }, { status: 400 });
  }
}
