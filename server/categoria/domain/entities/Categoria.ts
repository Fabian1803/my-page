// server/categoria/domain/entities/Categoria.ts
export interface Categoria {
  id?: string;
  nombre: string;
  imagenUrl: string;
  destacado: boolean;
}