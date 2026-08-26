import ImagesFabian from "@/features/fabianPage/pages/imagesFabian";
import { getResourcesUseCase } from "@/server/resources/infrastructure/dependencies";

export const revalidate = 3600;

export default async function Page() {
    let imagenes: any = [];
    try {
        imagenes = await getResourcesUseCase.execute({ tipo: "IMAGENES" });
    } catch (error) {
        console.error("Error al cargar imágenes en /fabianrivera/imagenes:", error);
    }
    return <ImagesFabian datosCertificados={Array.isArray(imagenes) ? imagenes : []} />;
}
