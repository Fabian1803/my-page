import { NextResponse } from "next/server";
import { deleteDeviceUseCase } from "@/server/auth/infrastructure/dependencies";
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ credentialId: string }> }
) {
  try {
    const { credentialId } = await params;
    const result = await deleteDeviceUseCase.execute(credentialId);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
