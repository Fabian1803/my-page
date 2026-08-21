// features/dashboardPage/mainPage/settings/services/settingServices.ts
import { startRegistration } from "@simplewebauthn/browser";

export interface DeviceItem {
    id: string;
    credentialId: string;
    counter: number;
}

export interface SecurityProfileResult {
    success: boolean;
    user?: {
        id: string;
        email: string;
        createdAt?: string;
    };
    devices?: DeviceItem[];
    error?: string;
}

export interface ServiceResult {
    success: boolean;
    message?: string;
    data?: any;
    error?: string;
}

export const settingServices = {
    async getSecurityProfile(): Promise<SecurityProfileResult> {
        try {
            const response = await fetch('/api/auth/profile');
            const result = await response.json();
            if (!response.ok || !result.success) {
                return { success: false, error: result.error || 'Error al obtener perfil de seguridad.' };
            }
            return {
                success: true,
                user: result.data.user,
                devices: result.data.devices,
            };
        } catch (err: any) {
            return { success: false, error: err.message || 'Error de conexión.' };
        }
    },
    async registerBiometrics(): Promise<ServiceResult> {
        try {
            const challengeRes = await fetch('/api/auth/register-device/challenge', {
                method: 'POST',
            });
            if (!challengeRes.ok) throw new Error('Error al solicitar registro biométrico.');
            const challengeData = await challengeRes.json();
            if (!challengeData.success || !challengeData.data?.options) {
                throw new Error(challengeData.error || 'Opciones de registro inválidas.');
            }
            const { options } = challengeData.data;
            const regResponse = await startRegistration(options);
            const verifyRes = await fetch('/api/auth/register-device/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body: regResponse,
                    expectedChallenge: options.challenge,
                }),
            });

            if (!verifyRes.ok) throw new Error('Error en la verificación del registro.');
            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
                throw new Error(verifyData.error || 'Fallo al vincular el dispositivo.');
            }

            return {
                success: true,
                message: '¡Dispositivo biométrico vinculado con éxito!',
                data: verifyData.data,
            };
        } catch (err: any) {
            console.error('Error en settingServices.registerBiometrics:', err);
            const msg = err.message || '';
            if (msg.includes('The operation was aborted') || msg.includes('cancelled')) {
                return { success: false, error: 'Registro cancelado por el usuario.' };
            }
            return { success: false, error: err.message || 'No se pudo vincular el dispositivo.' };
        }
    },
    async deleteDevice(credentialId: string): Promise<ServiceResult> {
        try {
            const response = await fetch(`/api/auth/devices/${encodeURIComponent(credentialId)}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                return { success: false, error: result.error || 'Error al eliminar el dispositivo.' };
            }
            return { success: true, message: 'Dispositivo eliminado.' };
        } catch (err: any) {
            return { success: false, error: err.message || 'Error de conexión.' };
        }
    },

    async updatePassword(currentPassword: string, newPassword: string): Promise<ServiceResult> {
        try {
            const response = await fetch('/api/auth/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                return { success: false, error: result.error || 'Error al actualizar contraseña.' };
            }
            return { success: true, message: result.data?.message || 'Contraseña actualizada.' };
        } catch (err: any) {
            return { success: false, error: err.message || 'Error de conexión.' };
        }
    },

    async updateEmail(newEmail: string, currentPassword: string): Promise<ServiceResult> {
        try {
            const response = await fetch('/api/auth/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newEmail, currentPassword }),
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                return { success: false, error: result.error || 'Error al actualizar el correo.' };
            }
            return { success: true, message: result.data?.message || 'Correo actualizado.' };
        } catch (err: any) {
            return { success: false, error: err.message || 'Error de conexión.' };
        }
    },
};
