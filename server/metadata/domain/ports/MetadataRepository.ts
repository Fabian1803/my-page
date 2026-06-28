//server/metadata/domain/ports/MetadataRepository.ts
import { Metadata } from "../models/Metadata";
export interface MetadataRepository {
  save(metadata: Metadata): Promise<any>;
  findAll(): Promise<any[]>;
}
