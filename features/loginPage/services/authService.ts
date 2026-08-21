// features/loginPage/services/authService.ts
import { startAuthentication } from "@simplewebauthn/browser";

export interface LoginResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export interface ProfileMetadata {
  nombre?: string;
  url_imagen?: string;
}

export const authService = {

  async getProfileMetadata(): Promise<ProfileMetadata | null> {
    try {
      const response = await fetch('/api/metadata');
      if (!response.ok) return null;
      const json = await response.json();
      const raw = json?.data || json;
      return {
        nombre: raw?.nombre || '',
        url_imagen: raw?.url_imagen || ''
      };
    } catch {
      return null;
    }
  },

  async loginWithPassword(password: string, email: string): Promise<LoginResult> {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
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

  async loginWithBiometrics(email?: string): Promise<LoginResult> {
    try {
      const cleanEmail = email?.trim() || undefined;
      const challengeRes = await fetch("/api/auth/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      if (!challengeRes.ok) throw new Error("Error al obtener el desafío biométrico.");
      const challengeData = await challengeRes.json();
      if (!challengeData.success || !challengeData.data?.options) {
        throw new Error(challengeData.error || "Desafío biométrico no válido.");
      }
      const { options, email: targetEmail } = challengeData.data;
      const authResponse = await startAuthentication(options);
      const verifyRes = await fetch("/api/auth/verify-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: authResponse,
          expectedChallenge: options.challenge,
          email: targetEmail || cleanEmail,
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
};
