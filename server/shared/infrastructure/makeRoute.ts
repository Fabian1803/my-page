import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export function makeRoute(useCase: { execute: (req: Request) => Promise<any> }) {
  return async (request: Request) => {
    try {
      const result = await useCase.execute(request);
      const method = request.method?.toUpperCase();
      if (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE") {
        try {
          revalidatePath("/", "layout");
        } catch (e) {
          console.warn("Aviso al revalidar caché:", e);
        }
      }

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message || "Error interno" },
        { status: 500 }
      );
    }
  };
}
