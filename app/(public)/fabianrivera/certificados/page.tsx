import type { Metadata } from 'next'
import CertificatesFabian from '@/features/fabianPage/pages/certificatesFabian'
import { getResourcesUseCase } from '@/server/resources/infrastructure/dependencies'

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Certificados y Credenciales",
  description: "Certificaciones profesionales, credenciales y títulos de especialización en ingeniería de software obtenidos por Fabian Rivera.",
  openGraph: {
    title: "Certificados y Credenciales | Fabian Rivera",
    description: "Certificaciones profesionales y credenciales en ingeniería de software obtenidas por Fabian Rivera.",
    url: "https://fabianrivera.dev/fabianrivera/certificados",
  }
};

export default async function Page() {
    let certificados: any = [];
    try {
        certificados = await getResourcesUseCase.execute({ tipo: "CERTIFICADO" });
    } catch (error) {
        console.error("Error al cargar certificados en /fabianrivera/certificados:", error);
    }
    return <CertificatesFabian datosCertificados={Array.isArray(certificados) ? certificados : []} />;
}