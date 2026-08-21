import { AuthRepository } from "../domain/ports/AuthRepository";
import { TokenService } from "../domain/ports/TokenService";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
export class UpdatePasswordUseCase {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService
  ) { }
  async execute(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) throw new Error("No autorizado.");
    const payload = await this.tokenService.verifyToken(token);
    if (!payload) throw new Error("Sesión inválida o expirada.");
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) throw new Error("La contraseña actual y la nueva contraseña son obligatorias.");
    if (newPassword.length < 6) throw new Error("La nueva contraseña debe tener al menos 6 caracteres.");
    const usuario = await this.authRepository.findByEmail(payload.email);
    if (!usuario) throw new Error("Usuario no encontrado.");
    const isMatch = await bcrypt.compare(currentPassword, usuario.passwordHash);
    if (!isMatch) throw new Error("La contraseña actual es incorrecta.");
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await this.authRepository.updatePassword(usuario.id, newPasswordHash);
    return {
      success: true,
      message: "Contraseña actualizada correctamente.",
    };
  }
}
