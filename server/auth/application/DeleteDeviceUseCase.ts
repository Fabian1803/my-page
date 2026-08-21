import { AuthRepository } from "../domain/ports/AuthRepository";
import { TokenService } from "../domain/ports/TokenService";
import { cookies } from "next/headers";
export class DeleteDeviceUseCase {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService
  ) { }
  async execute(credentialId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) throw new Error("No autorizado.");
    const payload = await this.tokenService.verifyToken(token);
    if (!payload) throw new Error("Sesión inválida o expirada.");
    if (!credentialId) throw new Error("Identificador de dispositivo no proporcionado.");
    await this.authRepository.deleteDevice(credentialId);
    return {
      success: true,
      message: "Dispositivo biométrico eliminado exitosamente.",
    };
  }
}
