import AboutFabian from '@/features/fabianPage/pages/aboutFabian'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';
export default async function page() {
    const config = await getMetadataUseCase.execute();
    const { nombre, descripcion, url_imagen, experiencias, educacion } = config || {};
    const datosFiltrados = { nombre, descripcion, url_imagen, experiencias, educacion };
    return <AboutFabian metadata={datosFiltrados} />
}