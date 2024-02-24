import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const WrongInformations = () => {
    return NextResponse.json({ status: 203 });
  };

  try {
    const { username, password } = await request.json();
    await dbConnect();

    return User.findOne({ username }).then((user) => {
      if (!user) {
        return WrongInformations();
      }

      return bcrypt
        .compare(password, user.hashedPassword)
        .then((isSamePassword: boolean) => {
          if (!isSamePassword) {
            return WrongInformations();
          }
          const tokenData = {
            id: user._id,
            username: user.username,
          };
          const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
          });

          const response = NextResponse.json(
            { message: "ok" },
            {
              status: 202,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Set the token as an HTTP-only cookie
          response.cookies.set("token", token, {
            httpOnly: true,
          });

          return response;
        });
    });
  } catch {
    return NextResponse.json({ status: 404 }, { status: 404 });
  }
}
