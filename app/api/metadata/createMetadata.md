# Módulo de Metadatos y Multimedia (POST / GET)

Este documento detalla el funcionamiento del ciclo de vida de la configuración global del sitio. El sistema implementa **Arquitectura Hexagonal** y utiliza **Vercel Blob** de forma optimizada (mediante `Blob` binarios puros para evitar saturar la memoria RAM Serverless) junto con **Prisma ORM** en **PostgreSQL**.

---

## 1. Cómo Funciona Internamente

El sistema opera bajo una estrategia de **Registro Único** fijando el ID estático `"mi-portafolio-unico-id"`. 

1. **Aislamiento de Infraestructura:** El API Router entrega la petición nativa directamente al Core.
2. **Procesamiento de Archivos Pesados:** Si el formulario contiene imágenes o PDFs, el Caso de Uso extrae los datos como objetos ligeros `Blob`, eliminando metadatos innecesarios del sistema operativo para proteger los límites de memoria RAM de las funciones de Vercel.
3. **Persistencia Inteligente:** El repositorio utiliza la instrucción `.upsert()` de Prisma. Si el registro con el ID único ya existe, actualiza sus campos; si no existe, lo crea por primera vez.

---

## 2. Método POST (Guardar / Actualizar)

Permite enviar textos, configuraciones de diseño y archivos binarios de forma simultánea.

*   **Endpoint:** `POST /api/metadata`
*   **Content-Type:** `multipart/form-data`

### Campos Esperados en el FormData:
*   **`imagen`** (File/Blob) `[Opcional]`: Imagen de perfil o portada.
*   **`documento`** (File/Blob) `[Opcional]`: Currículum o documento informativo en formato estricto PDF.
*   **`metadatos`** (String JSON) `[Obligatorio]`: Objeto con textos, colores o flags serializados.
    *   *Ejemplo:* `'{"titulo": "Mi Portafolio", "color_principal": "#999999"}'`

### Flujo del POST:
1. El caso de uso detecta los archivos. Si existen, invoca internamente el servicio `VercelMediaStorage`.
2. Vercel Blob procesa el stream binario, aloja los archivos en carpetas dedicadas (`/images/` o `/documents/`) y retorna sus URLs públicas.
3. El Core inyecta dinámicamente estas nuevas URLs dentro del objeto de metadatos.
4. El Dominio ejecuta el `Sanitizer` automático, eliminando cualquier rastro de código malicioso (`<script>`, `<>`, etc.).
5. Prisma guarda o actualiza el objeto JSON limpio en la tabla `MetaDataResource`.

### Ejemplo de Respuesta (POST Success):
```json
{
  "success": true,
  "data": {
    "id": "mi-portafolio-unico-id",
    "metadatos": {
      "titulo": "Mi Portafolio",
      "color_principal": "#999999",
      "url_imagen": "https://vercel-storage.com",
      "url_cv_pdf": "https://vercel-storage.com"
    }
  }
}
```

---

## 3. Método GET (Mostrar / Consumir)

Se utiliza al arrancar la aplicación web o el portafolio para pintar las imágenes, textos y colores del usuario.

*   **Endpoint:** `GET /api/metadata`
*   **Content-Type:** `application/json`

### Flujo del GET:
1. El API Router delega la petición al `GetMetadataUseCase`.
2. El repositorio ejecuta una consulta directa y de alta velocidad a PostgreSQL a través de `prisma.metaDataResource.findMany()`.
3. Al venir los datos completamente sanitizados y limpios desde la inserción del POST, el servidor no procesa strings repetidas veces, garantizando respuestas inmediatas (menores a 1-2 ms) ideales para el rendimiento del lado del cliente.

### Ejemplo de Respuesta (GET Success):
```json
{
  "success": true,
  "data": [
    {
      "id": "mi-portafolio-unico-id",
      "metadatos": {
        "titulo": "Mi Portafolio",
        "color_principal": "#999999",
        "url_imagen": "https://vercel-storage.com",
        "url_cv_pdf": "https://vercel-storage.com"
      }
    }
  ]
}
```
