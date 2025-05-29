import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export const runtime = "experimental-edge"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/hsr-editor/login";
  const token = request.cookies.get("token")?.value || "";

  try {
    const tokenSecretUint8Array = new TextEncoder().encode(
      process.env.TOKEN_SECRET
    );

    let isSecuredToken;
    if (token) {
      const { payload } = await jwtVerify(token, tokenSecretUint8Array, {
        algorithms: ["HS256"],
      });
      isSecuredToken =
        payload.id === process.env.ADMIN_ID || process.env.KUJAUNE_ID;
    }

    if (isPublicPath && isSecuredToken) {
      return NextResponse.redirect(new URL("/hsr-editor/", request.nextUrl));
    }

    if (!isPublicPath && !isSecuredToken) {
      return NextResponse.redirect(
        new URL("/hsr-editor/login", request.nextUrl)
      );
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/hsr-editor/:path*",
    "/api/character",
    "/api/characters",
    "/api/other",
    "/api/changelog",
    "/api/editorChange",
  ],
};
