// server/auth/application/GenerateLoginChallengeUseCase.ts
import { AuthRepository } from "../domain/ports/AuthRepository";
import { generateAuthenticationOptions } from "@simplewebauthn/server";

export class GenerateLoginChallengeUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: Request) {
    const body = await request.json().catch(() => ({}));
    const email = body.email || "fabianriveraabian3@gmail.com"; 

    const usuario = await this.authRepository.findByEmail(email);
    if (!usuario) throw new Error("Usuario no registrado para autenticación biométrica.");

    const options = await generateAuthenticationOptions({
      rpID: process.env.NEXT_PUBLIC_RP_ID || "localhost",
      allowCredentials: [],
      userVerification: "preferred", 
    });

    return {
      id: usuario.id,
      email: usuario.email,
      options
    };
  }
}