import { NextResponse } from "next/server";
import { updateEmailUseCase } from "@/server/auth/infrastructure/dependencies";
export async function POST(request: Request) {
  try {
    const result = await updateEmailUseCase.execute(request);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
