import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    // Retrieve the token from the cookies
    const token = request.cookies.get("token")?.value || "";

    // Verify and decode the token using the secret key
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // Return the user ID from the decoded token
    return decodedToken;
  } catch (error) {
    // Handle the error or return a response to the user
    return null;
  }
};
