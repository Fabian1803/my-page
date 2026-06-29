import CvFabian from '@/features/fabianPage/pages/cvFabian'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';
export default async function page() {
    const config = await getMetadataUseCase.execute();
    const { url_cv_pdf } = config || {};
    const datosFiltrados = { url_cv_pdf };
    return <CvFabian metadata={datosFiltrados} />
}
