
export interface CvDocumentData {
    url_cv_pdf: string;
}

export interface ServiceResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export const cvServices = {
    async getCvDocument(): Promise<ServiceResult<CvDocumentData>> {
        try {
            const response = await fetch('/api/metadata');
            const result = await response.json();
            if (!result.success) return { success: false, error: result.error || 'Error al obtener datos del CV.' };
            return {
                success: true,
                data: {
                    url_cv_pdf: result.data?.url_cv_pdf || ''
                }
            };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al consultar el CV.' };
        }
    },

    async uploadCvDocument(file: File): Promise<ServiceResult<any>> {
        try {
            const formData = new FormData();
            formData.append("metadatos", JSON.stringify({}));
            formData.append("documento", file);
            const response = await fetch('/api/metadata', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (!result.success) return { success: false, error: result.error || 'Error al subir el CV a Cloud Storage.' };
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al subir el CV.' };
        }
    },

    async removeCvDocument(): Promise<ServiceResult<any>> {
        try {
            const formData = new FormData();
            formData.append("metadatos", JSON.stringify({ url_cv_pdf: "" }));
            const response = await fetch('/api/metadata', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (!result.success) return { success: false, error: result.error || 'Error al eliminar el archivo de CV.' };
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || 'Error de red al eliminar el CV.' };
        }
    }
};
