//server/metadata/application/GetMetadataUseCase.ts
import { MetadataRepository } from "../domain/ports/MetadataRepository";
export class GetMetadataUseCase {
  constructor(private repository: MetadataRepository) { }
  async execute() {
    const records = await this.repository.findAll();
    if (!records || records.length === 0) return { nombre: "", descripcion: "", experiencias: [], educacion: [] };
    return records[0].metadatos;
  }
}
