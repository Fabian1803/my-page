// server/auth/application/RegisterDeviceChallengeUseCase.ts
import { AuthRepository } from "../domain/ports/AuthRepository";
import { TokenService } from "../domain/ports/TokenService";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import { RegisterDeviceChallengeResponseDTO } from "../domain/dtos";
import { cookies } from "next/headers";

export class RegisterDeviceChallengeUseCase {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService
  ) { }

  async execute(request: Request): Promise<RegisterDeviceChallengeResponseDTO> {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) throw new Error("Debes iniciar sesión para registrar un dispositivo.");
    const payload = await this.tokenService.verifyToken(token);
    if (!payload) throw new Error("Sesión inválida o expirada.");
    const usuario = await this.authRepository.findByEmail(payload.email);
    if (!usuario) throw new Error("Usuario no encontrado.");
    const urlObj = new URL(request.url);
    const rpID = urlObj.hostname;
    const existingDevices = usuario.dispositivos || [];
    const options = await generateRegistrationOptions({
      rpName: "Google Cloud Platform Portfolio",
      rpID,
      userID: new Uint8Array(Buffer.from(usuario.id)),
      userName: usuario.email,
      attestationType: "none",
      excludeCredentials: existingDevices.map(dev => ({
        id: dev.credentialId,
        transports: ["hybrid", "internal"],
      })),
      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "preferred",
        authenticatorAttachment: "platform",
      },
    });

    return {
      options,
      email: usuario.email,
    };
  }
}
