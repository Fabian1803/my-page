import { AuthRepository } from "../domain/ports/AuthRepository";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { GenerateChallengeResponseDTO } from "../domain/dtos";
export class GenerateLoginChallengeUseCase {
  constructor(private authRepository: AuthRepository) { }
  async execute(request: Request): Promise<GenerateChallengeResponseDTO> {
    const body = await request.json().catch(() => ({}));
    const email = body.email || "fabianriveraabian3@gmail.com";
    const usuario = await this.authRepository.findByEmail(email);
    if (!usuario) throw new Error("Usuario no registrado para autenticación biométrica.");
    const dispositivos = usuario.dispositivos;
    const urlObj = new URL(request.url);
    const rpID = urlObj.hostname;
    const options = await generateAuthenticationOptions({
      rpID: rpID,
      allowCredentials: dispositivos.map((dev) => ({
        id: dev.credentialId,
        type: "public-key" as const,
        transports: ["internal", "hybrid"] as AuthenticatorTransport[],
      })),
      userVerification: "preferred",
    });
    return {
      id: usuario.id,
      email: usuario.email,
      options
    };
  }
}