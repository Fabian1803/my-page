export interface CertificateItem {
    id: string;
    tipo?: string;
    nombre: string;
    institucion?: string | null;
    descripcion: string;
    destacado?: boolean;
    imagenPrincipalUrl: string;
    miniaturaUrl?: string | null;
    vinetas: { id?: string; comentario: string }[];
    categorias: { id?: string; nombre: string; imagenUrl?: string }[];
}

export interface ServiceResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export const certificateServices = {
    async getAll(): Promise<ServiceResult<CertificateItem[]>> {
        try {
            const response = await fetch('/api/resources?tipo=CERTIFICADO');
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al obtener certificados.' };
            }
            return { success: true, data: result.data || [] };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al consultar certificados.' };
        }
    },

    async getById(id: string): Promise<ServiceResult<CertificateItem>> {
        try {
            const response = await fetch(`/api/resources?tipo=CERTIFICADO&id=${id}`);
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al obtener el certificado.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al consultar el certificado.' };
        }
    },

    async create(formData: FormData): Promise<ServiceResult<CertificateItem>> {
        try {
            formData.set("tipo", "CERTIFICADO");
            const response = await fetch('/api/resources', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al crear el certificado.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al crear el certificado.' };
        }
    },

    async update(id: string, formData: FormData): Promise<ServiceResult<CertificateItem>> {
        try {
            formData.set("id", id);
            formData.set("tipo", "CERTIFICADO");
            const response = await fetch('/api/resources', {
                method: 'PUT',
                body: formData
            });
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al actualizar el certificado.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al actualizar el certificado.' };
        }
    },

    async toggleDestacado(id: string, currentDestacado: boolean): Promise<ServiceResult<any>> {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("tipo", "CERTIFICADO");
            formData.append("destacado", String(!currentDestacado));

            const response = await fetch('/api/resources', {
                method: 'PUT',
                body: formData
            });
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al cambiar estado destacado.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al alternar destacado.' };
        }
    },

    async delete(id: string): Promise<ServiceResult<any>> {
        try {
            const response = await fetch(`/api/resources?id=${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al eliminar el certificado.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al eliminar el certificado.' };
        }
    }
};
