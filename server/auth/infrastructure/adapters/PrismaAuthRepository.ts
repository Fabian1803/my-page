import { AuthRepository } from "../../domain/ports/AuthRepository";
import { Usuario } from "../../domain/models/Usuario";
import { Dispositivo } from "../../domain/models/Dispositivo";
import { prisma } from "@/server/shared/infrastructure/prisma";
export class PrismaAuthRepository implements AuthRepository {

  async findByEmail(email: string): Promise<Usuario | null> {
    const userModel = await prisma.usuario.findUnique({
      where: { email },
      include: { dispositivos: true }
    });
    if (!userModel) return null;
    return new Usuario({
      id: userModel.id,
      email: userModel.email,
      passwordHash: userModel.passwordHash,
      createdAt: userModel.createdAt,
      dispositivos: userModel.dispositivos.map(d => new Dispositivo({
        id: d.id,
        credentialId: d.credentialId,
        publicKey: d.publicKey,
        counter: d.counter,
        usuarioId: d.usuarioId
      }))
    });
  }

  async findById(id: string): Promise<Usuario | null> {
    const userModel = await prisma.usuario.findUnique({
      where: { id },
      include: { dispositivos: true }
    });
    if (!userModel) return null;
    return new Usuario({
      id: userModel.id,
      email: userModel.email,
      passwordHash: userModel.passwordHash,
      createdAt: userModel.createdAt,
      dispositivos: userModel.dispositivos.map(d => new Dispositivo({
        id: d.id,
        credentialId: d.credentialId,
        publicKey: d.publicKey,
        counter: d.counter,
        usuarioId: d.usuarioId
      }))
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
    await prisma.dispositivo.upsert({
      where: { credentialId: dispositivo.credentialId },
      update: {
        publicKey: dispositivo.publicKey,
        counter: dispositivo.counter,
        usuarioId: dispositivo.usuarioId
      },
      create: {
        id: dispositivo.id,
        credentialId: dispositivo.credentialId,
        publicKey: dispositivo.publicKey,
        counter: dispositivo.counter,
        usuarioId: dispositivo.usuarioId
      }
    });
  }

  async deleteDevice(credentialId: string): Promise<void> {
    await prisma.dispositivo.deleteMany({
      where: { credentialId }
    });
  }

  async updateDeviceCounter(credentialId: string, newCounter: number): Promise<void> {
    await prisma.dispositivo.update({
      where: { credentialId },
      data: { counter: newCounter }
    });
  }

  async updatePassword(userId: string, newPasswordHash: string): Promise<void> {
    await prisma.usuario.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash }
    });
  }

  async updateEmail(userId: string, newEmail: string): Promise<void> {
    await prisma.usuario.update({
      where: { id: userId },
      data: { email: newEmail }
    });
  }
}