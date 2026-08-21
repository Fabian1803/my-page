import CvFabian from '@/features/fabianPage/pages/cvFabian'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';
export const revalidate = 3600;
export default async function Page() {
    const config = await getMetadataUseCase.execute();
    return <CvFabian metadata={{ url_cv_pdf: config?.url_cv_pdf }} />
}
