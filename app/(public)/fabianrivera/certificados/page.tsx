import CertificatesFabian from '@/features/fabianPage/pages/certificatesFabian'
import { getResourcesUseCase } from '@/server/resources/infrastructure/dependencies'
export const revalidate = 3600;
export default async function Page() {
    const certificados = await getResourcesUseCase.execute({ tipo: "CERTIFICADO" });
    return <CertificatesFabian datosCertificados={certificados} />;
}