import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface AuthTokenPayload {
  id?: string;
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/hsr-editor/login";
  const token = request.cookies.get("token")?.value ?? "";

  let isSecuredToken = false;

  try {
    const tokenSecret = process.env.TOKEN_SECRET;

    if (!tokenSecret) {
      console.error("TOKEN_SECRET is not configured");
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (token) {
      const tokenSecretUint8Array = new TextEncoder().encode(tokenSecret);

      const { payload } = await jwtVerify<AuthTokenPayload>(
        token,
        tokenSecretUint8Array,
        {
          algorithms: ["HS256"],
        }
      );

      isSecuredToken =
        payload.id === process.env.ADMIN_ID ||
        payload.id === process.env.KUJAUNE_ID ||
        payload.id === process.env.POMPOM_ID;
    }

    if (isPublicPath && isSecuredToken) {
      return NextResponse.redirect(
        new URL("/hsr-editor/", request.nextUrl)
      );
    }

    if (!isPublicPath && !isSecuredToken) {
      return NextResponse.redirect(
        new URL("/hsr-editor/login", request.nextUrl)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erreur de vérification du token :", error);

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
    "/api/teams/edit",
  ],
};