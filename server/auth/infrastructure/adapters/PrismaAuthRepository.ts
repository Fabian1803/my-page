// server/auth/infrastructure/adapters/PrismaAuthRepository.ts
import { AuthRepository } from "../../domain/ports/AuthRepository";
import { Usuario } from "../../domain/models/Usuario";
import { Dispositivo } from "../../domain/models/Dispositivo";
import { prisma } from "@/lib/prisma";

export class PrismaAuthRepository implements AuthRepository {
  
  async findByEmail(email: string): Promise<Usuario | null> {
    const userModel = await prisma.usuario.findUnique({ where: { email } });
    if (!userModel) return null;
    
    return new Usuario({
      id: userModel.id,
      email: userModel.email,
      passwordHash: userModel.passwordHash,
      createdAt: userModel.createdAt
    });
  }

  async findDeviceById(credentialId: string): Promise<Dispositivo | null> {
    const deviceModel = await prisma.dispositivo.findUnique({ where: { credentialId } });
    if (!deviceModel) return null;

    return new Dispositivo({
      id: deviceModel.id,
      credentialId: deviceModel.credentialId,
      publicKey: deviceModel.publicKey,
      counter: deviceModel.counter,
      usuarioId: deviceModel.usuarioId
    });
  }

  async saveDevice(dispositivo: Dispositivo): Promise<void> {
    await prisma.dispositivo.create({
      data: {
        id: dispositivo.id,
        credentialId: dispositivo.credentialId,
        publicKey: dispositivo.publicKey,
        counter: dispositivo.counter,
        usuarioId: dispositivo.usuarioId
      }
    });
  }

  async updateDeviceCounter(credentialId: string, newCounter: number): Promise<void> {
    await prisma.dispositivo.update({
      where: { credentialId },
      data: { counter: newCounter }
    });
  }
}