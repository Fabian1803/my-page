// features/dashboardPage/mainPage/about-me/services/aboutMeServices.ts

export interface ExperienceItem {
    id: string;
    empresa: string;
    cargo: string;
    fechaInicio: string;
    fechaFin: string;
    vinetas: string[];
    urlWeb?: string;
    urlMasInfo?: string;
}

export interface AboutMeData {
    nombre: string;
    descripcion: string;
    url_imagen?: string;
    experiencias: ExperienceItem[];
    educacion: ExperienceItem[];
}

export interface ServiceResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export const aboutMeServices = {
    async getAboutMe(): Promise<ServiceResult<AboutMeData>> {
        try {
            const response = await fetch('/api/metadata');
            const result = await response.json();
            if (!result.success) return { success: false, error: result.error || 'Error al obtener información de perfil.' };
            const rawData = result.data || result;
            const data = rawData.metadatos || rawData;
            return {
                success: true,
                data: {
                    nombre: data.nombre || '',
                    descripcion: data.descripcion || '',
                    url_imagen: data.url_imagen || '',
                    experiencias: Array.isArray(data.experiencias) ? data.experiencias : [],
                    educacion: Array.isArray(data.educacion) ? data.educacion : []
                }
            };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al consultar el perfil.' };
        }
    },

    async saveAboutMe(data: AboutMeData, photoFile?: File | null): Promise<ServiceResult<any>> {
        try {
            const formData = new FormData();
            formData.append("metadatos", JSON.stringify({
                nombre: data.nombre,
                descripcion: data.descripcion,
                experiencias: data.experiencias,
                educacion: data.educacion,
                url_imagen: data.url_imagen
            }));
            if (photoFile) formData.append("imagen", photoFile);
            const response = await fetch('/api/metadata', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (!result.success) return { success: false, error: result.error || 'Error al guardar los datos de perfil.' };
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al guardar el perfil.' };
        }
    },

    async removeAvatar(): Promise<ServiceResult<any>> {
        try {
            const formData = new FormData();
            formData.append("metadatos", JSON.stringify({ url_imagen: "" }));

            const response = await fetch('/api/metadata', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (!result.success) return { success: false, error: result.error || 'Error al eliminar la foto de perfil.' };
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al eliminar la foto.' };
        }
    }
};
