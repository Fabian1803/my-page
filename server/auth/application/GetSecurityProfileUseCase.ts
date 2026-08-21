import { AuthRepository } from "../domain/ports/AuthRepository";
import { TokenService } from "../domain/ports/TokenService";
import { SecurityProfileResponseDTO } from "../domain/dtos";
import { cookies } from "next/headers";
export class GetSecurityProfileUseCase {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService
  ) { }
  async execute(): Promise<SecurityProfileResponseDTO> {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) throw new Error("No autorizado.");
    const payload = await this.tokenService.verifyToken(token);
    if (!payload) throw new Error("Sesión inválida o expirada.");
    const usuario = await this.authRepository.findByEmail(payload.email);
    if (!usuario) throw new Error("Usuario no encontrado.");
    return {
      user: {
        id: usuario.id,
        email: usuario.email,
        createdAt: usuario.createdAt,
      },
      devices: usuario.dispositivos.map((d) => ({
        id: d.id,
        credentialId: d.credentialId,
        counter: d.counter,
      })),
    };
  }
}
