import AboutFabian from '@/features/fabianPage/pages/aboutFabian'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';
export const revalidate = 3600;
export default async function Page() {
    const config = await getMetadataUseCase.execute();
    return <AboutFabian metadata={config || {}} />
}