/**
 * Transforma las etiquetas <img> estándar con metadatos custom en componentes <ImageCodepedia />
 * estructurados para ser almacenados en la base de datos.
 */
export const convertImagesToCodepedia = (html: string): string => {
    if (typeof window === 'undefined') return html
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const images = doc.querySelectorAll('img')

    images.forEach((img) => {
        const src = img.getAttribute('src') || ''
        const title = img.getAttribute('data-title') || ''
        const desc = img.getAttribute('data-description') || ''

        const customTag = doc.createElement('ImageCodepedia')
        customTag.setAttribute('id', 'imagen-portada')
        customTag.setAttribute('imageSrc', src)
        customTag.setAttribute('title', title)
        customTag.setAttribute('description', desc)

        img.parentNode?.replaceChild(customTag, img)
    })

    return doc.body.innerHTML
}

/**
 * Convierte un objeto File local de la galería a un string Base64 asíncronamente.
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
    })
}