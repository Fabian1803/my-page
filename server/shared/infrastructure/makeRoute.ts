// server/shared/infrastructure/makeRoute.ts
import { NextResponse } from "next/server";
export function makeRoute(useCase: { execute: (req: Request) => Promise<any> }) {
  return async (request: Request) => {
    try {
      const result = await useCase.execute(request);
      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message || "Error interno" },
        { status: 500 }
      );
    }
  };
}
