import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

async function getTokenInfo(request: NextRequest) {
  const req = await fetch(`${process.env.WWW}/api/me`);
  const res = await req.json();
  return res;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (accessible without a token)
  const isPublicPath = path === "/hsr-editor/login";

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || "";

  try {
    const tokenSecretUint8Array = new TextEncoder().encode(
      process.env.TOKEN_SECRET
    );

    let isSecuredToken;
    if (token) {
      const { payload } = await jwtVerify(token, tokenSecretUint8Array, {
        algorithms: ["HS256"], // Specify the algorithm used for signing your tokens
      });
      isSecuredToken = payload.id === process.env.SECURED_ID;
    }

    // Verify the token's signature
    if (isPublicPath && isSecuredToken) {
      // If trying to access a public path with a token, redirect to the home page
      return NextResponse.redirect(new URL("/hsr-editor/", request.nextUrl));
    }

    // If trying to access a protected path without a token, redirect to the home page
    if (!isPublicPath && !isSecuredToken) {
      return NextResponse.redirect(
        new URL("/hsr-editor/login", request.nextUrl)
      );
    }
  } catch (error) {
    // If the token verification fails, handle specific errors
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

// It specifies the paths for which this middleware should be executed.
export const config = {
  matcher: ["/hsr-editor/:path*", "/api/character"],
};
