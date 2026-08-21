import { AuthRepository } from "../domain/ports/AuthRepository";
import { TokenService } from "../domain/ports/TokenService";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
export class UpdateEmailUseCase {
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
    const { newEmail, currentPassword } = await request.json();
    if (!newEmail || !newEmail.includes("@")) throw new Error("Introduce un correo electrónico válido.");
    if (!currentPassword) throw new Error("Debes confirmar tu contraseña actual para cambiar el correo.");
    const usuario = await this.authRepository.findByEmail(payload.email);
    if (!usuario) throw new Error("Usuario no encontrado.");
    const isMatch = await bcrypt.compare(currentPassword, usuario.passwordHash);
    if (!isMatch) throw new Error("La contraseña actual es incorrecta.");
    const existing = await this.authRepository.findByEmail(newEmail);
    if (existing && existing.id !== usuario.id) throw new Error("El correo ingresado ya se encuentra en uso por otra cuenta.");
    await this.authRepository.updateEmail(usuario.id, newEmail);
    const newToken = await this.tokenService.generateToken({
      id: usuario.id,
      email: newEmail,
    });
    cookieStore.set("auth_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });
    return {
      success: true,
      email: newEmail,
      message: "Correo electrónico actualizado correctamente.",
    };
  }
}
