// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
export async function POST() {
  const response = NextResponse.json({ success: true, message: "Sesión cerrada" }, { status: 200 });
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, 
    expires: new Date(0),
  });

  return response;
}