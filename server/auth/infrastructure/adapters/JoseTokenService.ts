// server/auth/infrastructure/adapters/JoseTokenService.ts
import { SignJWT } from 'jose';

export class JoseTokenService {
  async generateToken(payload: any): Promise<string> {
    const secretKey = process.env.JWT_SECRET;
    
    if (!secretKey) throw new Error("Falta la variable de entorno JWT_SECRET en tu archivo .env");
    const secret = new TextEncoder().encode(secretKey);

    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);
  }
}