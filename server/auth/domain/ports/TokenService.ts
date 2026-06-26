// server/auth/domain/ports/TokenService.ts
export interface TokenService {
  generateToken(payload: { id: string; email: string }): Promise<string>;
}