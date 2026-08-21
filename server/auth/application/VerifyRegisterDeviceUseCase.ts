// server/auth/application/VerifyRegisterDeviceUseCase.ts
import { AuthRepository } from "../domain/ports/AuthRepository";
import { TokenService } from "../domain/ports/TokenService";
import { Dispositivo } from "../domain/models/Dispositivo";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { cookies } from "next/headers";

export class VerifyRegisterDeviceUseCase {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService
  ) { }
  async execute(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) throw new Error("Debes iniciar sesión para vincular un dispositivo.");
    const payload = await this.tokenService.verifyToken(token);
    if (!payload) throw new Error("Sesión inválida o expirada.");
    const usuario = await this.authRepository.findByEmail(payload.email);
    if (!usuario) throw new Error("Usuario no encontrado.");
    const { body, expectedChallenge } = await request.json();
    if (!body || !expectedChallenge) throw new Error("Faltan datos de registro biométrico.");
    const urlObj = new URL(request.url);
    const expectedRPID = urlObj.hostname;
    const expectedOrigin = urlObj.origin;
    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: expectedChallenge,
      expectedOrigin: expectedOrigin,
      expectedRPID: expectedRPID,
    });
    if (!verification.verified || !verification.registrationInfo) throw new Error("No se pudo verificar la clave de seguridad del dispositivo.");
    const { credential } = verification.registrationInfo;
    const publicKeyBase64 = Buffer.from(credential.publicKey).toString("base64");
    const nuevoDispositivo = new Dispositivo({
      credentialId: credential.id,
      publicKey: publicKeyBase64,
      counter: credential.counter,
      usuarioId: usuario.id,
    });
    await this.authRepository.saveDevice(nuevoDispositivo);
    return {
      success: true,
      credentialId: credential.id,
      message: "¡Dispositivo biométrico vinculado con éxito!",
    };
  }
}
