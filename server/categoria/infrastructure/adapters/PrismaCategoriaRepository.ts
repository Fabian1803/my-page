// server/categoria/domain/entities/Categoria.ts
import { PrismaClient } from "@/prisma/generated/prisma-client";
import { CategoriaRepository } from "../../domain/ports/CategoriaRepository";
import { Categoria } from "../../domain/entities/Categoria";

export class PrismaCategoriaRepository implements CategoriaRepository {
  private prisma: PrismaClient;
  constructor(prismaInstance: PrismaClient) {
    this.prisma = prismaInstance;
  }

  async create(categoria: Omit<Categoria, 'id'>): Promise<Categoria> {
    return await this.prisma.categoria.create({
      data: {
        nombre: categoria.nombre,
        imagenUrl: categoria.imagenUrl,
        destacado: categoria.destacado
      }
    });
  }

  async findAll(): Promise<Categoria[]> {
    return await this.prisma.categoria.findMany({
      orderBy: { nombre: 'asc' }
    });
  }

  async findById(id: string): Promise<Categoria | null> {
    return await this.prisma.categoria.findUnique({ where: { id } });
  }

  async findByNombre(nombre: string): Promise<Categoria | null> {
    return await this.prisma.categoria.findUnique({ where: { nombre } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.categoria.delete({ where: { id } });
  }
}