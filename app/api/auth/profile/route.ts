import { NextResponse } from "next/server";
import { getSecurityProfileUseCase } from "@/server/auth/infrastructure/dependencies";
export async function GET() {
  try {
    const profile = await getSecurityProfileUseCase.execute();
    return NextResponse.json({ success: true, data: profile }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 401 });
  }
}
