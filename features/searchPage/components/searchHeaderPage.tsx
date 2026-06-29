import UserActionsHeader from '@/components/userActionsHeader'
import { getMetadataUseCase } from '@/server/metadata/infrastructure/dependencies';
export default async function SearchHeaderPage() {
  const config = await getMetadataUseCase.execute();
  const { gmail, github, gitlab, discord, linkedin, telefono, whatsapp, url_cv_pdf, url_imagen } = config || {};
  const datosFiltrados = { gmail, github, gitlab, discord, linkedin, telefono, whatsapp, url_cv_pdf, url_imagen };
  return (
    <header className="flex h-full items-center justify-end gap-2">
      <a href={github} target="_blank" rel="noopener noreferrer">
        Github
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        Linkedin
      </a>
      <UserActionsHeader avatarUrl={url_imagen} socialLinks={datosFiltrados} />
    </header>
  )
}