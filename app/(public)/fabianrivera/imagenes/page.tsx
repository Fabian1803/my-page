import ImagesFabian from "@/features/fabianPage/pages/imagesFabian";
import { getResourcesUseCase } from "@/server/resources/infrastructure/dependencies";
export default async  function page() { 
      const fakeRequest = new Request("http://localhost/api/resources");
      const rawData = await getResourcesUseCase.execute(fakeRequest);
      const certificadosIniciales = rawData.map((item: any) => ({
          ...item,
          titulo: item.nombre,
          universidad: item.instituto || 'Certificación Profesional',
          imagenCertificado: item.imagenPrincipalUrl,
          imagenLogo: item.miniaturaUrl || '/log.webp'
      }));
    return <ImagesFabian datosCertificados={certificadosIniciales} /> 
}
