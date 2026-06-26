// server/resources/domain/ports/ResourceRepository.ts
import { Resource } from "../models/Resource";

export interface ResourceRepository {
  save(resource: Resource): Promise<any>;
}
