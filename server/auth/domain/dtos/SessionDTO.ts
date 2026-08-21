export interface SessionStatusResponseDTO {
  authenticated: boolean;
  user: {
    id: string;
    email: string;
  } | null;
  expiresIn?: string;
  message?: string;
}
