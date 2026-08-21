export interface SocialLinksData {
    telefono: string;
    discord: string;
    gmail: string;
    whatsapp: string;
    github: string;
    linkedin: string;
    gitlab: string;
}

export interface ServiceResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export const socialLinksServices = {
    async getSocialLinks(): Promise<ServiceResult<SocialLinksData>> {
        try {
            const response = await fetch('/api/metadata');
            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al obtener redes sociales.' };
            }
            const data = result.data || {};
            return {
                success: true,
                data: {
                    telefono: data.telefono || '',
                    discord: data.discord || '',
                    gmail: data.gmail || '',
                    whatsapp: data.whatsapp || '',
                    github: data.github || '',
                    linkedin: data.linkedin || '',
                    gitlab: data.gitlab || ''
                }
            };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al consultar redes sociales.' };
        }
    },

    async saveSocialLinks(links: SocialLinksData): Promise<ServiceResult<any>> {
        try {
            const formData = new FormData();
            formData.append("metadatos", JSON.stringify(links));

            const response = await fetch('/api/metadata', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (!result.success) {
                return { success: false, error: result.error || 'Error al guardar los enlaces.' };
            }
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al guardar los enlaces.' };
        }
    }
};
