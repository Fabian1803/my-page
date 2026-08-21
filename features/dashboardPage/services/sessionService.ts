// features/dashboardPage/services/sessionService.ts

export interface SessionResult {
  authenticated: boolean;
  user: {
    id: string;
    email: string;
  } | null;
  expiresIn?: string;
  message?: string;
  error?: string;
}

export const sessionService = {
  async checkSession(): Promise<SessionResult> {
    try {
      const response = await fetch('/api/auth/me');
      const result = await response.json();

      return {
        authenticated: Boolean(result.authenticated),
        user: result.user || null,
        expiresIn: result.expiresIn,
        message: result.message,
        error: result.error,
      };
    } catch (err: any) {
      return {
        authenticated: false,
        user: null,
        error: err.message || "Error al verificar la sesión.",
      };
    }
  },

  async logout(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      return Boolean(result.success);
    } catch {
      return false;
    }
  },
};
