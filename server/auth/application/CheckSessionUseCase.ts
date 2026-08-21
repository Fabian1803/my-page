import { AuthRepository } from "../domain/ports/AuthRepository";
import { TokenService } from "../domain/ports/TokenService";
import { SessionStatusResponseDTO } from "../domain/dtos";
import { cookies } from "next/headers";
export class CheckSessionUseCase {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService
  ) { }
  async execute(request?: Request): Promise<SessionStatusResponseDTO> {
    let token: string | undefined;
    try {
      const cookieStore = await cookies();
      token = cookieStore.get("auth_token")?.value;
    } catch {
      if (request) {
        const authHeader = request.headers.get("authorization");
        if (authHeader?.startsWith("Bearer ")) {
          token = authHeader.substring(7);
        }
      }
    }

    if (!token) {
      return {
        authenticated: false,
        user: null,
        message: "No se encontró una sesión activa.",
      };
    }
    const payload = await this.tokenService.verifyToken(token);
    if (!payload) {
      return {
        authenticated: false,
        user: null,
        message: "El token de sesión ha expirado o es inválido.",
      };
    }
    const usuario = await this.authRepository.findByEmail(payload.email);
    if (!usuario) {
      return {
        authenticated: false,
        user: null,
        message: "El usuario asociado a la sesión ya no existe.",
      };
    }
    return {
      authenticated: true,
      user: {
        id: usuario.id,
        email: usuario.email,
      },
      expiresIn: "1h",
      message: "Sesión activa y verificada.",
    };
  }
}
