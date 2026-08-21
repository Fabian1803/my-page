import { startAuthentication } from "@simplewebauthn/browser";
export const ADMIN_EMAIL = "fabianriveraabian3@gmail.com";
export interface LoginResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

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

export const authService = {
  async loginWithPassword(password: string, email: string = ADMIN_EMAIL): Promise<LoginResult> {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        return {
          success: false,
          error: result.error || 'Contraseña incorrecta. Vuelve a intentarlo.'
        };
      }
      return {
        success: true,
        data: result.data,
        message: result.data?.message || 'Inicio de sesión exitoso.'
      };
    } catch (err: any) {
      console.error("Error en authService.loginWithPassword:", err);
      return {
        success: false,
        error: 'No se pudo conectar con el servidor. Error del sistema.'
      };
    }
  },
  async loginWithBiometrics(email: string = ADMIN_EMAIL): Promise<LoginResult> {
    try {
      const challengeRes = await fetch("/api/auth/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!challengeRes.ok) throw new Error("Error al obtener el desafío biométrico.");
      const challengeData = await challengeRes.json();
      if (!challengeData.success || !challengeData.data?.options) throw new Error(challengeData.error || "Desafío biométrico no válido.");
      const { options } = challengeData.data;
      const authResponse = await startAuthentication(options);
      const verifyRes = await fetch("/api/auth/verify-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: authResponse,
          expectedChallenge: options.challenge,
          email,
        }),
      });
      if (!verifyRes.ok) throw new Error("Error en la verificación del dispositivo.");
      const verifyData = await verifyRes.json();
      if (!verifyData.success) throw new Error(verifyData.error || "Fallo en la autenticación biométrica.");
      return {
        success: true,
        data: verifyData.data,
        message: verifyData.data?.message || 'Autenticación biométrica concedida.'
      };
    } catch (err: any) {
      console.error("Error en authService.loginWithBiometrics:", err);
      const mensajeError = err.message || "";
      if (mensajeError.includes("The operation was aborted") || mensajeError.includes("cancelled")) {
        return { success: false, error: "Autenticación biométrica cancelada." };
      } else if (mensajeError.includes("not allowed") || mensajeError.includes("failed")) {
        return { success: false, error: "Rostro o huella no reconocidos. Inténtalo de nuevo." };
      } else {
        return { success: false, error: err.message || "No se pudo verificar. Error del sistema." };
      }
    }
  },
  async checkSession(): Promise<SessionResult> {
    try {
      const response = await fetch('/api/auth/me');
      const result = await response.json();

      return {
        authenticated: Boolean(result.authenticated),
        user: result.user || null,
        expiresIn: result.expiresIn,
        message: result.message,
        error: result.error
      };
    } catch (err: any) {
      return {
        authenticated: false,
        user: null,
        error: err.message || "Error al verificar la sesión."
      };
    }
  },
  async logout(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      return Boolean(result.success);
    } catch {
      return false;
    }
  }
};
