export interface ProjectLink {
    id: string;
    type: 'github' | 'docker' | 'gitlab' | 'web';
    url: string;
}

export interface ContentBlock {
    id: string;
    content: string;
}

export interface ProjectItem {
    id: string;
    tipo?: string;
    destacado: boolean;
    nombre: string;
    descripcion: string;
    instituto?: string | null;
    imagenPrincipalUrl: string;
    miniaturaUrl?: string | null;
    categorias: { id?: string; nombre: string }[];
    enlaces: ProjectLink[];
    seccionesDoc: { id?: string; orden?: number; contenidoJson: string }[];
}

export interface ServiceResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export const projectServices = {
    async getAll(): Promise<ServiceResult<ProjectItem[]>> {
        try {
            const response = await fetch('/api/resources?tipo=PROYECTO');
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al obtener proyectos.' };
            }
            return { success: true, data: result.data || [] };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al consultar proyectos.' };
        }
    },

    async getById(id: string): Promise<ServiceResult<ProjectItem>> {
        try {
            const response = await fetch(`/api/resources?tipo=PROYECTO&id=${id}`);
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al obtener el proyecto.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al consultar el proyecto.' };
        }
    },

    async create(formData: FormData): Promise<ServiceResult<ProjectItem>> {
        try {
            formData.set("tipo", "PROYECTO");
            const response = await fetch('/api/resources', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al crear el proyecto.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al crear el proyecto.' };
        }
    },

    async update(id: string, formData: FormData): Promise<ServiceResult<ProjectItem>> {
        try {
            formData.set("id", id);
            formData.set("tipo", "PROYECTO");
            const response = await fetch('/api/resources', {
                method: 'PUT',
                body: formData
            });
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al actualizar el proyecto.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al actualizar el proyecto.' };
        }
    },

    async toggleDestacado(id: string, currentDestacado: boolean): Promise<ServiceResult<any>> {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("tipo", "PROYECTO");
            formData.append("destacado", String(!currentDestacado));

            const response = await fetch('/api/resources', {
                method: 'PUT',
                body: formData
            });
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al alternar destacado.' };
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
                return { success: false, error: result.error || 'Error al eliminar el proyecto.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al eliminar el proyecto.' };
        }
    }
};
