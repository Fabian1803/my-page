// server/resources/domain/ports/ResourceRepository.ts
import { Resource } from "../models/Resource";
export interface ResourceRepository {
  save(resource: Resource): Promise<any>;
  findAll(tipo?: string): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  delete(id: string): Promise<void>;update(id: string, resource: Resource): Promise<any>;
}