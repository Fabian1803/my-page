// server/auth/domain/ports/AuthRepository.ts
import { Usuario } from "../models/Usuario";
import { Dispositivo } from "../models/Dispositivo";

export interface AuthRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  findById(id: string): Promise<Usuario | null>;
  findDeviceById(credentialId: string): Promise<Dispositivo | null>;
  saveDevice(dispositivo: Dispositivo): Promise<void>;
  deleteDevice(credentialId: string): Promise<void>;
  updateDeviceCounter(credentialId: string, newCounter: number): Promise<void>;
  updatePassword(userId: string, newPasswordHash: string): Promise<void>;
  updateEmail(userId: string, newEmail: string): Promise<void>;
}