import { NextResponse, NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  //   console.log(request.cookies);
  //    NextResponse.redirect(new URL("/home", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
