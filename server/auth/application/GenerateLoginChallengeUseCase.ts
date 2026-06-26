// server/auth/application/GenerateLoginChallengeUseCase.ts
import { AuthRepository } from "../domain/ports/AuthRepository";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
export class GenerateLoginChallengeUseCase {
  constructor(private authRepository: AuthRepository) {}
  async execute(request: Request) {
    const { email } = await request.json();
    if (!email) throw new Error("El correo es requerido para iniciar el Touch ID.");
    const usuario = await this.authRepository.findByEmail(email);
    if (!usuario) throw new Error("Usuario no registrado.");

    const options = await generateAuthenticationOptions({
      rpID: process.env.NEXT_PUBLIC_RP_ID || "localhost",
      allowCredentials: [],
      userVerification: "preferred", 
    });

    return {
      options,
      usuarioId: usuario.id
    };
  }
}