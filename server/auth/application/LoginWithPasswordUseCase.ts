// server/auth/application/LoginWithPasswordUseCase.ts
import { AuthRepository } from "../domain/ports/AuthRepository";
import bcrypt from "bcrypt";

export class LoginWithPasswordUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) throw new Error("El correo y la contraseña son campos obligatorios.");
    const usuario = await this.authRepository.findByEmail(email);
    if (!usuario) throw new Error("Credenciales incorrectas.");

    const isPasswordValid = await bcrypt.compare(password, usuario.passwordHash);
    if (!isPasswordValid) throw new Error("Credenciales incorrectas.");

    return {
      id: usuario.id,
      email: usuario.email,
      message: "Sesión iniciada correctamente con contraseña."
    };
  }
}