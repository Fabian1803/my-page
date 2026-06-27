// server/auth/application/GenerateLoginChallengeUseCase.ts
import { AuthRepository } from "../domain/ports/AuthRepository";
import { generateAuthenticationOptions } from "@simplewebauthn/server";

// 💡 Creamos un tipo local que extiende tu modelo base para incluir la relación
type UsuarioConDispositivos = {
  id: string;
  email: string;
  dispositivos: {
    credentialId: string;
    publicKey: string;
    counter: number;
  }[];
};

export class GenerateLoginChallengeUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: Request) {
    const body = await request.json().catch(() => ({}));
    const email = body.email || "fabianriveraabian3@gmail.com"; 
    const usuario = await this.authRepository.findByEmail(email) as UsuarioConDispositivos | null;
    if (!usuario) throw new Error("Usuario no registrado para autenticación biométrica.");
    const dispositivos = usuario.dispositivos || []; 

    const rpID = (process.env.NEXT_PUBLIC_RP_ID || "localhost").trim();

    const options = await generateAuthenticationOptions({
      rpID: rpID,
      allowCredentials: dispositivos.map((dev) => ({
        id: dev.credentialId,
        type: "public-key",
        transports: ["internal"], 
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