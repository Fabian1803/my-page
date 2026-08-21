import ImagesFabian from "@/features/fabianPage/pages/imagesFabian";
import { getResourcesUseCase } from "@/server/resources/infrastructure/dependencies";

export default async function Page() { 
    const fakeRequest = new Request("http://localhost/api/resources?tipo=IMAGENES");
    const rawData = await getResourcesUseCase.execute(fakeRequest);
    
    const imagenesIniciales = (rawData || []).map((item: any) => ({
        ...item,
        titulo: item.titulo || item.nombre,
        universidad: item.universidad || item.instituto || (item.tipo === 'PROYECTO' ? 'Proyecto de Software' : 'Certificación Profesional'),
        imagenCertificado: item.imagenCertificado || item.imagenPrincipalUrl,
        imagenLogo: item.imagenLogo || item.miniaturaUrl || (item.tipo === 'PROYECTO' ? '/FLogo.webp' : '/log.webp')
    }));

    return <ImagesFabian datosCertificados={imagenesIniciales} /> 
}
