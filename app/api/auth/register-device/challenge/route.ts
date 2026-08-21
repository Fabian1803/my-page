import { NextResponse } from "next/server";
import { registerDeviceChallengeUseCase } from "@/server/auth/infrastructure/dependencies";
export async function POST(request: Request) {
  try {
    const data = await registerDeviceChallengeUseCase.execute(request);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
