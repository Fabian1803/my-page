import { NextResponse } from "next/server";
import { verifyRegisterDeviceUseCase } from "@/server/auth/infrastructure/dependencies";
export async function POST(request: Request) {
  try {
    const result = await verifyRegisterDeviceUseCase.execute(request);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
