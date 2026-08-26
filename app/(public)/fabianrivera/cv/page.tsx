import CvFabian from '@/features/fabianPage/pages/cvFabian'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';

export const revalidate = 3600;

export default async function Page() {
    let config: any = null;
    try {
        config = await getMetadataUseCase.execute();
    } catch (error) {
        console.error("Error al cargar metadatos en /fabianrivera/cv:", error);
    }

    return <CvFabian metadata={{ url_cv_pdf: config?.url_cv_pdf }} />
}
