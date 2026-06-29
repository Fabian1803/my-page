export async function saveMetadata(metadatos: Record<string, any>, archivoBinario?: { key: 'imagen' | 'documento', file: File }) {
    try {
        const formData = new FormData();
        formData.append("metadatos", JSON.stringify(metadatos));
        if (archivoBinario && archivoBinario.file) formData.append(archivoBinario.key, archivoBinario.file);
        const response = await fetch('/api/metadata', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.error || "Error desconocido en el servidor");
        return { success: true, data: result.data };
    } catch (error: any) {
        console.error("[API Client Error]:", error.message);
        throw error;
    }
}

export async function getMetadata() {
    try {
        const response = await fetch('/api/metadata');
        const result = await response.json();
        if (!result.success) throw new Error(result.error);
        return result.data || null;
    } catch (error) {
        console.error("[API Client Error GET]:", error);
        return null;
    }
}