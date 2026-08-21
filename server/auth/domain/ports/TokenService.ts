export interface TokenPayload {
  id: string;
  email: string;
  [key: string]: any;
}
export interface TokenService {
  generateToken(payload: TokenPayload): Promise<string>;
  verifyToken(token: string): Promise<TokenPayload | null>;
}