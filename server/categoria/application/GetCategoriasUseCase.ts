// server/categoria/application/GetCategoriasUseCase.ts
import { CategoriaRepository } from "../domain/ports/CategoriaRepository";
import { Categoria } from "../domain/entities/Categoria";
export class GetCategoriasUseCase {
  constructor(private repository: CategoriaRepository) {}
  async execute(request: Request): Promise<Categoria[]> {
    return await this.repository.findAll();
  }
}