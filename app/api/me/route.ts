import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // Extract user ID from the authentication token
    const decodedToken = await getDataFromToken(request);
    //console.log(decodedToken);

    // Find the user in the database based on the user ID
    const user = await User.findOne({ username: decodedToken.username }).select(
      "-hashedPassword"
    );
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ errorMe: error.message }, { status: 400 });
  }
}
