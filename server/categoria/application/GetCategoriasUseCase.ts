import { CategoriaRepository } from "../domain/ports/CategoriaRepository";
import { Categoria } from "../domain/entities/Categoria";

export class GetCategoriasUseCase {
  constructor(private repository: CategoriaRepository) { }
  async execute(requestOrParams?: Request | { id?: string }): Promise<Categoria[] | Categoria | null> {
    let id: string | null = null;
    if (requestOrParams instanceof Request) {
      const { searchParams } = new URL(requestOrParams.url);
      id = searchParams.get("id");
    } else if (requestOrParams) {
      id = requestOrParams.id || null;
    }
    if (id) return await this.repository.findById(id);
    return await this.repository.findAll();
  }
}