import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get("authjs.session-token") || request.cookies.get("__Secure-authjs.session-token");
    if(!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"],
  };