import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const skipPaths: string[] = [
  "/training-funds",
  "/idcard-printing-fee",
  "/financial-report",
  "/management",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isSkipping = skipPaths.some((path) => pathname.startsWith(path));

  if (isSkipping) {
    return NextResponse.redirect(new URL("/under-development", request.url));
  }

  return NextResponse.next();
}
