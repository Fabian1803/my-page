// features/dashboardPage/mainPage/tagsAdmin/services/tagServices.ts

export interface TagItem {
    id: string;
    nombre: string;
    imagenUrl: string;
    destacado: boolean;
}

export interface TagServiceResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export const tagServices = {
    async getAll(): Promise<TagServiceResponse<TagItem[]>> {
        try {
            const response = await fetch('/api/categorias');
            const result = await response.json();
            return result;
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al obtener etiquetas.' };
        }
    },
    async getById(id: string): Promise<TagServiceResponse<TagItem>> {
        try {
            const response = await fetch(`/api/categorias?id=${encodeURIComponent(id)}`);
            const result = await response.json();
            return result;
        } catch (error: any) {
            return { success: false, error: error.message || 'Error al obtener la etiqueta.' };
        }
    },

    async create(formData: FormData): Promise<TagServiceResponse<TagItem>> {
        try {
            const response = await fetch('/api/categorias', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            return result;
        } catch (error: any) {
            return { success: false, error: error.message || 'Error al crear la etiqueta.' };
        }
    },

    async update(id: string, data: FormData | { nombre?: string; destacado?: boolean }): Promise<TagServiceResponse<TagItem>> {
        try {
            let response: Response;
            if (data instanceof FormData) {
                if (!data.has('id')) data.append('id', id);
                response = await fetch(`/api/categorias?id=${encodeURIComponent(id)}`, {
                    method: 'PATCH',
                    body: data,
                });
            } else {
                response = await fetch('/api/categorias', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, ...data }),
                });
            }
            const result = await response.json();
            return result;
        } catch (error: any) {
            return { success: false, error: error.message || 'Error al actualizar la etiqueta.' };
        }
    },

    async toggleDestacado(id: string, destacado: boolean): Promise<TagServiceResponse<TagItem>> {
        return this.update(id, { destacado });
    },

    async delete(id: string): Promise<TagServiceResponse<{ message: string }>> {
        try {
            const response = await fetch(`/api/categorias?id=${encodeURIComponent(id)}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            return result;
        } catch (error: any) {
            return { success: false, error: error.message || 'Error al eliminar la etiqueta.' };
        }
    },
};
