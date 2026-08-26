import HomeCodepedia from "@/features/codePediaPage/pages/homeCodepedia";
import { getMetadataUseCase } from "@/server/metadata/infrastructure/dependencies";
export const revalidate = 3600;

export default async function Codepedia() {
    let config: any = null;
    try {
        config = await getMetadataUseCase.execute();
    } catch (error) {
        console.error("Error al cargar metadatos en /Codepedia:", error);
    }

    return <HomeCodepedia metadata={config || {}} />
}
