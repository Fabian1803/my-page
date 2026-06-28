//server/metadata/infrastructure/adapters/PrismaMetadataRepository.ts
import { MetadataRepository } from "../../domain/ports/MetadataRepository";
import { Metadata } from "../../domain/models/Metadata";
import { Prisma } from "../../../../prisma/generated/prisma-client";
import { prisma } from "@/server/shared/infrastructure/prisma"; 

export class PrismaMetadataRepository implements MetadataRepository {
  async save(metadata: Metadata): Promise<any> {
    const data = metadata.toObject();
    const metadatosValue = data.metadatos !== null ? data.metadatos : Prisma.JsonNull;
    return await prisma.metaDataResource.upsert({
      where: { id: data.id },
      update: { metadatos: metadatosValue },
      create: { id: data.id, metadatos: metadatosValue }
    });
  }

  async findAll(): Promise<any[]> {
    return await prisma.metaDataResource.findMany();
  }
}