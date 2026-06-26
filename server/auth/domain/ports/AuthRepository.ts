// server/auth/domain/ports/AuthRepository.ts
import { Usuario } from "../models/Usuario";
import { Dispositivo } from "../models/Dispositivo";

export interface AuthRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  findDeviceById(credentialId: string): Promise<Dispositivo | null>;
  saveDevice(dispositivo: Dispositivo): Promise<void>;
  updateDeviceCounter(credentialId: string, newCounter: number): Promise<void>;
}