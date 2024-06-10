import { ProfileItem } from "api/models/profile";
import { fetchUserProfile, refreshToken } from "api/routes/Profile/profile";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("@jwtToken")?.value;
  const path = request.cookies.get("path")?.value;
  var loggedIn = false;

  const initializeApp = async () => {
    if (!!token) {
      const user: ProfileItem = await fetchUserProfile({});
      if (!!user) {
        loggedIn = true;
      } else {
        const refresh = await refreshToken({});
        if (!!refresh) {
          loggedIn = true;
        } else {
          loggedIn = false;
        }
      }
    } else {
      loggedIn = false;
    }
  };

  await initializeApp();

  if (!loggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (loggedIn && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(
      new URL(path || "/dashboard/feed", request.url)
    );
  }
}
