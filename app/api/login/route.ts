import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

export async function POST(request: Request) {
  const WrongInformations = () => {
    return NextResponse.json({ status: 203 });
  };

  try {
    const { username, password } = await request.json();
    //console.log(username, password);
    await dbConnect();

    return User.findOne({ username }).then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return WrongInformations();
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
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
            { status: 202 }
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
