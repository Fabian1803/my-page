// server/resources/application/GetResourcesUseCase.ts
import { ResourceRepository } from "../domain/ports/ResourceRepository";
export class GetResourcesUseCase {
  constructor(private repository: ResourceRepository) {}
  async execute(request?: Request) {
    let tipo: string | undefined = undefined;
    if (request && request.url) {
      try {
        const { searchParams } = new URL(request.url);
        tipo = searchParams.get("tipo") || undefined;
      } catch (urlError) {
        console.error("No se pudo parsear la URL en GetResourcesUseCase:", urlError);
      }
    }
    return await this.repository.findAll(tipo);
  }
}