import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const PUBLIC_URLS = ["/"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_URLS.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          status: 401,
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = session.user?.role;

  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (
    pathname.startsWith("/partner") &&
    !pathname.startsWith("/partner/onboarding")
  ) {
    if (role !== "partner") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/api")) {
    if (!session.user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          status: 401,
        },
        {
          status: 401,
        },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff|woff2|ttf)$).*)",
  ],
};
