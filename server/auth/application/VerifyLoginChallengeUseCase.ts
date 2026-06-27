// server/auth/application/VerifyLoginChallengeUseCase.ts
import { AuthRepository } from "../domain/ports/AuthRepository";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
export class VerifyLoginChallengeUseCase {
  constructor(private authRepository: AuthRepository) { }
  async execute(request: Request) {
    const { body, expectedChallenge, email } = await request.json();
    if (!body || !expectedChallenge || !email) throw new Error("Faltan datos criptográficos obligatorios.");
    const usuario = await this.authRepository.findByEmail(email);
    if (!usuario) throw new Error("Usuario no encontrado.");
    const dispositivo = await this.authRepository.findDeviceById(body.id);
    if (!dispositivo) throw new Error("Este dispositivo no está vinculado a tu cuenta.");

    const verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: expectedChallenge,
      expectedOrigin: process.env.NEXT_PUBLIC_ORIGIN || "http://localhost:3000",
      expectedRPID: process.env.NEXT_PUBLIC_RP_ID || "localhost",
      credential: {
        id: dispositivo.credentialId,
        publicKey: Buffer.from(dispositivo.publicKey, "base64"),
        counter: dispositivo.counter,
      },
    });

    if (!verification.verified) throw new Error("Autenticación biométrica fallida.");
    await this.authRepository.updateDeviceCounter(dispositivo.credentialId, verification.authenticationInfo.newCounter);

    return {
      id: usuario.id,
      email: usuario.email,
      success: true,
      message: "¡Acceso concedido mediante Touch ID!"
    };
  }
}