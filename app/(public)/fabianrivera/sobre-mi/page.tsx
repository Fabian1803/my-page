import AboutFabian from '@/features/fabianPage/pages/aboutFabian'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';

export const revalidate = 3600;

export default async function Page() {
    let config: any = null;
    try {
        config = await getMetadataUseCase.execute();
    } catch (error) {
        console.error("Error al cargar metadatos en /fabianrivera/sobre-mi:", error);
    }

    return <AboutFabian metadata={config || {}} />
}