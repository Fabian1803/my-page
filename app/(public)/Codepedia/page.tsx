import HomeCodepedia from "@/features/codePediaPage/pages/homeCodepedia";
import { getMetadataUseCase } from "@/server/metadata/infrastructure/dependencies";
export const revalidate = 3600;
export default async function Codepedia() {
    const config = await getMetadataUseCase.execute();
    return <HomeCodepedia metadata={config || {}} />
}
