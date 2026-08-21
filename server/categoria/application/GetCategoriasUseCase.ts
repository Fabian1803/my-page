import { CategoriaRepository } from "../domain/ports/CategoriaRepository";
import { Categoria } from "../domain/entities/Categoria";
export class GetCategoriasUseCase {
  constructor(private repository: CategoriaRepository) { }
  async execute(request: Request): Promise<Categoria[] | Categoria | null> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      return await this.repository.findById(id);
    }
    return await this.repository.findAll();
  }
}