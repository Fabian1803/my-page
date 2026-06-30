// server/categoria/domain/ports/CategoriaRepository.ts
import { Categoria } from "../entities/Categoria";
export interface CategoriaRepository {
  create(categoria: Omit<Categoria, 'id'>): Promise<Categoria>;
  findAll(): Promise<Categoria[]>;
  findById(id: string): Promise<Categoria | null>;
  findByNombre(nombre: string): Promise<Categoria | null>;
  delete(id: string): Promise<void>;
}