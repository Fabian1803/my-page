import CertificatesFabian from '@/features/fabianPage/pages/certificatesFabian'
import { getResourcesUseCase } from '@/server/resources/infrastructure/dependencies'

export const revalidate = 3600;

export default async function Page() {
    let certificados: any = [];
    try {
        certificados = await getResourcesUseCase.execute({ tipo: "CERTIFICADO" });
    } catch (error) {
        console.error("Error al cargar certificados en /fabianrivera/certificados:", error);
    }
    return <CertificatesFabian datosCertificados={Array.isArray(certificados) ? certificados : []} />;
}