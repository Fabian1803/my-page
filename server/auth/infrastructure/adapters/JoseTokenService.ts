import { SignJWT, jwtVerify } from 'jose';
import { TokenPayload, TokenService } from '../../domain/ports/TokenService';
export class JoseTokenService implements TokenService {
  private getSecretKey(): Uint8Array {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) throw new Error("Falta la variable de entorno JWT_SECRET en tu archivo .env");
    return new TextEncoder().encode(secretKey);
  }
  async generateToken(payload: TokenPayload): Promise<string> {
    const secret = this.getSecretKey();
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);
  }
  async verifyToken(token: string): Promise<TokenPayload | null> {
    try {
      const secret = this.getSecretKey();
      const { payload } = await jwtVerify(token, secret);

      if (!payload || !payload.id || !payload.email) return null;

      return {
        id: String(payload.id),
        email: String(payload.email),
      };
    } catch {
      return null;
    }
  }
}