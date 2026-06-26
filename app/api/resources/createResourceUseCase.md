# Endpoint: Crear Recurso Multimedia (POST)

Este endpoint procesa un formulario complejo que incluye textos, estructuras de datos anidadas y archivos binarios (imágenes). Centraliza la subida de archivos a la nube y la persistencia relacional en la base de datos.

## Qué Espera (Request)

El endpoint recibe una petición con la cabecera `Content-Type: multipart/form-data`. Los campos obligatorios y opcionales del formulario deben enviarse con las siguientes llaves:

### Archivos Binarios
*   **`imagenPrincipal`** (File) `[Obligatorio]`: Archivo de imagen que se usará como portada principal.
*   **`miniatura`** (File) `[Opcional]`: Archivo de imagen para la vista previa reducida.

### Textos y Estructuras JSON
*   **`nombre`** (String) `[Obligatorio]`: Nombre identificador del recurso.
*   **`descripcion`** (String) `[Obligatorio]`: Texto descriptivo (Máximo 150 caracteres).
*   **`instituto`** (String) `[Opcional]`: Nombre de la institución asociada.
*   **`categorias`** (String JSON) `[Opcional]`: Array de objetos convertido a texto.
    *   *Ejemplo:* `'[{"nombre": "Tecnología"}, {"nombre": "Educación"}]'`
*   **`enlaces`** (String JSON) `[Opcional]`: Array de objetos convertido a texto.
    *   *Ejemplo:* `'[{"tipo": "Video", "url": "https://youtube.com..."}]'`
*   **`vinetas`** (String JSON) `[Opcional]`: Array de objetos convertido a texto.
    *   *Ejemplo:* `'[{"comentario": "Primer paso importante"}]'`

---

## Qué Hace (Flujo de Ejecución)

Cuando la petición llega al endpoint, el sistema ejecuta los siguientes pasos de forma secuencial y aislada gracias a la Arquitectura Hexagonal:

1.  **Parseo e Ingesta:** Extrae los archivos binarios y los textos del objeto `FormData`.
2.  **Subida de Archivos (Módulo Interno `media`):** 
    *   Envía el archivo `imagenPrincipal` a **Vercel Blob Storage**. El almacenamiento procesa el binario y retorna una URL pública segura (`https://...`).
    *   Si existe una `miniatura`, realiza el mismo proceso de subida y obtiene su respectiva URL.
3.  **Validación de Dominio:** Instancia la entidad `Resource` aplicando las reglas de negocio (ej. validar longitud de descripción e integridad de datos).
4.  **Persistencia Relacional (Prisma Adaptador):** Envía el objeto validado al repositorio. Prisma abre una transacción en **PostgreSQL** para insertar el registro padre (`MediaResource`) junto con todas sus tablas dependientes (`Categoria`, `Enlace`, `Vineta`) en cascada, garantizando que no queden datos huérfanos si algo falla.

---

## Cómo Guarda / Sale (Response)

Si el proceso es exitoso, la API responde con un estado **`201 Created`** y un objeto JSON que refleja la estructura exacta guardada en PostgreSQL (incluyendo los IDs autogenerados y marcas de tiempo):

```json
{
  "success": true,
  "data": {
    "id": "e9b2c3d4-e89b-12d3-a456-426614174000",
    "nombre": "Manual de Arquitectura Hexagonal",
    "descripcion": "Una guía completa para desacoplar tu lógica de negocio del framework utilizando TypeScript.",
    "instituto": "Código Limpio S.A.",
    "imagenPrincipalUrl": "https://vercel-storage.com",
    "miniaturaUrl": "https://vercel-storage.com",
    "createdAt": "2026-06-26T05:46:00.000Z",
    "updatedAt": "2026-06-26T05:46:00.000Z",
    "categorias": [
      { "id": "c1b2...", "nombre": "Tecnología", "mediaResourceId": "e9b2..." }
    ],
    "enlaces": [
      { "id": "l1b2...", "tipo": "Video", "url": "https://youtube.com...", "mediaResourceId": "e9b2..." }
    ],
    "vinetas": [
      { "id": "v1b2...", "comentario": "Primer paso importante", "mediaResourceId": "e9b2..." }
    ]
  }
}
```

### En caso de error (`400 Bad Request` / `500 Internal Error`):
```json
{
  "success": false,
  "error": "La descripción no puede superar los 150 caracteres."
}
```
