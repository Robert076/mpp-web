import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {

}

export const config = {
  matcher: ["/dashboard", "/"],
};
