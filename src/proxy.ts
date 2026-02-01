import { NextResponse, NextRequest } from "next/server";
import { UserService } from "./services/user.service";

const userService = new UserService();
export async function proxy(request: NextRequest) {
  //   console.log(request.cookies);
  //    NextResponse.redirect(new URL("/home", request.url));
  const session = await userService.getSession();
  console.log(session);
  return NextResponse.next();
}

export const config = {
  matcher: ["/","/dashboard", "/dashboard/:path*"],
};
