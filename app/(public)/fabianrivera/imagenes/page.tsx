import ImagesFabian from "@/features/fabianPage/pages/imagesFabian";
import { getResourcesUseCase } from "@/server/resources/infrastructure/dependencies";
export const revalidate = 3600;
export default async function Page() {
    const imagenes = await getResourcesUseCase.execute({ tipo: "IMAGENES" });
    return <ImagesFabian datosCertificados={imagenes} />;
}
