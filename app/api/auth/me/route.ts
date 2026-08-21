import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSessionUseCase, tokenService } from "@/server/auth/infrastructure/dependencies";
export async function GET(request: Request) {
  try {
    const session = await checkSessionUseCase.execute(request);
    const status = session.authenticated ? 200 : 401;
    const response = NextResponse.json(
      {
        success: session.authenticated,
        ...session,
      },
      { status }
    );

    if (session.authenticated && session.user) {
      const refreshedJwt = await tokenService.generateToken({
        id: session.user.id,
        email: session.user.email,
      });
      const cookieStore = await cookies();
      cookieStore.set("auth_token", refreshedJwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      });
    }
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        user: null,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
