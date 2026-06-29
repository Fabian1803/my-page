import AboutFabian from '@/features/fabianPage/pages/aboutFabian'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';
export default async function page() {
    const config = await getMetadataUseCase.execute();
    const metadataValida = config || {};
    return <AboutFabian metadata={metadataValida} />
}
