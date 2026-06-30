import CertificatesFabian from '@/features/fabianPage/pages/certificatesFabian'
import { getResourcesUseCase } from '@/server/resources/infrastructure/dependencies'
export const revalidate = 3600;
export default async function Page() {
  const fakeRequest = new Request("http://localhost/api/resources?tipo=CERTIFICADO");
  const rawData = await getResourcesUseCase.execute(fakeRequest);
  const certificadosIniciales = rawData.map((item: any) => ({
      ...item,
      titulo: item.nombre,
      universidad: item.instituto || 'Certificación Profesional',
      imagenCertificado: item.imagenPrincipalUrl,
      imagenLogo: item.miniaturaUrl || '/log.webp'
  }));
  return <CertificatesFabian datosCertificados={certificadosIniciales} />
}