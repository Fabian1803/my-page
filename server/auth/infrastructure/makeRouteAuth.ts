import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JoseTokenService } from "./adapters/JoseTokenService";
const tokenService = new JoseTokenService();

export function makeRouteAuth(useCase: { execute: (req: Request) => Promise<any> }) {
  return async (request: Request) => {
    try {
      const result = await useCase.execute(request);
      const jwt = await tokenService.generateToken({ id: result.id, email: result.email });

      const cookieStore = await cookies();
      cookieStore.set("auth_token", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 120,
      });

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  };
}
