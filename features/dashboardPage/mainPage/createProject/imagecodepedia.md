===============================================================================
SISTEMA DE DOCUMENTACIÓN DINÁMICA POR BLOQUES (TIPTAP + NEXT.JS)
===============================================================================

Este documento detalla la arquitectura, el flujo de datos y la estrategia de
persistencia para el sistema de bloques de documentación enriquecida. El módulo
permite redactar guías dinámicas con un límite estricto de hasta 7 bloques,
integrando de manera nativa la inserción de capturas o imágenes locales y 
empaquetándolas en componentes semánticos reutilizables.

-------------------------------------------------------------------------------
1. ARQUITECTURA Y FLUJO DE DATOS (PASO A PASO)
-------------------------------------------------------------------------------

El sistema está desacoplado bajo principios SOLID (Responsabilidad Única) y
opera en el frontend de la siguiente manera:

[Página / Vista] 
       │
       ▼
[Custom Hook: useCreateProject]
       │
       ├─► Enlaces Dinámicos (DashboardLinksForm)
       ├─► Miniatura del Proyecto (DashboardThumbnailForm)
       └─► Bloques de Documentación (DashboardBlocksForm)
                     │
                     ▼
           [UnifiedRichTextEditor] ◄─► [Custom Hook: useUnifiedEditor]
                     │                                  │
                     │ (onUpdate)                       └─► Inserción Imagen (Base64)
                     ▼
           [editorUtils.ts] ──► (Transforma <img> en <ImageCodepedia />)


FLUJO DE OPERACIÓN DE IMÁGENES:
1. Captura de datos: Al presionar el botón de imagen, un modal de React solicita
   un título, una descripción y el archivo binario desde la galería local.
2. Procesamiento: La imagen se lee de forma asíncrona en memoria y se convierte
   en un string Base64 limpio mediante un FileReader de JavaScript.
3. Inserción en TipTap: Para mantener la estabilidad del lienzo de edición y
   evitar problemas de renderizado, se inserta una etiqueta <img> estándar en el
   editor, pero inyectándole atributos de datos ocultos personalizados:
   'data-title' y 'data-description'.
4. Ciclo del Parser (The Ingredient): Cada vez que el usuario escribe o inserta
   contenido, el editor ejecuta su callback 'onUpdate'. Este intercepta el HTML
   crudo y, utilizando un DOMParser en memoria, transforma de forma transparente
   las etiquetas <img> en etiquetas estructuradas personalizadas:
   
   <ImageCodepedia id="img-1" imageSrc="data:image/png;base64,..." title="Título" description="Descripción"></ImageCodepedia>

-------------------------------------------------------------------------------
2. PERSISTENCIA EN LA BASE DE DATOS (BACKEND)
-------------------------------------------------------------------------------

Una de las grandes ventajas de esta arquitectura basada en componentes embebidos
es que no requiere crear esquemas relacionales complejos ni endpoints pesados
para subida de archivos binarios en el backend. Toda la documentación viaja y
se guarda como un único String de texto plano de gran tamaño.

A) ESTRUCTURA DEL JSON ENVIADO EN EL SUBMIT:
Cuando presionas "Guardar cambios", el formulario principal recopila el estado
y envía un payload idéntico a este:

{
  "nombre": "Corelia IA",
  "descripcion": "Sistema automatizado de inventarios mediante microservicios",
  "dynamicLinks": [
    { "id": "uuid-link-1", "type": "github", "url": "https://github.com/user/repo" }
  ],
  "contentBlocks": [
    {
      "id": "uuid-block-1",
      "content": "<h2>Arquitectura Base</h2><p>El sistema opera bajo microservicios...</p><ImageCodepedia id="img-corelia" imageSrc="data:image/jpeg;base64,..." title="Diagrama de bloques" description="Flujo de eventos procesados con Kong API Gateway y NestJS"></ImageCodepedia><p>Fin de la sección introductoria...</p>"
    }
  ]
}

B) MAPEADO EN BASES DE DATOS RELACIONALES (PostgreSQL / MySQL):
Debido a que el string de Base64 de una imagen puede ser extenso, debes usar un
tipo de dato de texto largo en tu motor de base de datos:
- En PostgreSQL: Usa el tipo 'TEXT'.
- En MySQL / MariaDB: Usa el tipo 'LONGTEXT'.

Ejemplo de Entidad en un backend con Java / Spring Boot:

@Entity
@Table(name = "proyecto_bloques")
public class ProyectoBloque {
    @Id
    private UUID id;

    @Column(columnDefinition = "LONGTEXT") // Soporte para strings masivos de HTML con Base64
    private String content;
    
    // Relación ManyToOne con la entidad de Proyecto principal...
}

-------------------------------------------------------------------------------
3. RENDERIZADO EN EL PORTAFOLIO PÚBLICO (VISTA DE LECTURA)
-------------------------------------------------------------------------------

Para pintar la documentación guardada en el frontend público de tus usuarios, NO
necesitas cargar TipTap (ahorrándote dependencias pesadas en el cliente). 
Puedes renderizar el HTML crudo y mapear la etiqueta custom <ImageCodepedia />
utilizando la librería 'html-react-parser':

Comando de instalación:
$ npm install html-react-parser

IMPLEMENTACIÓN DEL COMPONENTE DE RENDERIZADO PÚBLICO:

import parse, { Element } from 'html-react-parser';
import ImageCodepedia from '@/components/ImageCodepedia'; // Tu componente visual real

interface ProjectRenderProps {
    htmlContentFromDB: string;
}

export default function ProjectDocumentRender({ htmlContentFromDB }: ProjectRenderProps) {
    
    // Las opciones permiten interceptar nodos específicos antes de inyectarlos al DOM
    const options = {
        replace: (domNode: any) => {
            // Nota: Los navegadores convierten automáticamente los tags custom a minúsculas
            if (domNode instanceof Element && domNode.name === 'imagecodepedia') {
                const { imagesrc, title, description } = domNode.attribs;
                
                // Retornamos tu componente real de React hidratado con los datos del string
                return (
                    <ImageCodepedia 
                        id="img-dinamica"
                        imageSrc={imagesrc}
                        title={title}
                        description={description}
                    />
                );
            }
        }
    };

    return (
        <div className="prose max-w-none dark:prose-invert">
            {parse(htmlContentFromDB, options)}
        </div>
    );
}

-------------------------------------------------------------------------------
4. OPTIMIZACIONES Y CONSIDERACIONES TÉCNICAS
-------------------------------------------------------------------------------

- TAMAÑO DEL PAYLOAD: Almacenar imágenes en Base64 aumenta el peso del string
  aproximadamente un 33% sobre el binario original. Para capturas de pantalla de
  baja resolución u optimizadas es perfecto. Si a futuro deseas subir imágenes
  extremadamente pesadas (ej. mayores a 5MB), la recomendación es actualizar el
  'useUnifiedEditor' para que suba el archivo a un storage (AWS S3, Cloudinary,
  etc.) e inyecte la URL pública en el atributo 'imageSrc', manteniendo el 
  mismo tag semántico <ImageCodepedia /> intacto.
  
- SEGURIDAD (XSS): Como el panel de administración es privado y controlado por
  ti, la inyección es segura. No obstante, si abres bloques de texto a usuarios
  externos, recuerda pasar el string de la base de datos por un sanitizador
  como 'dompurify' antes de parsearlo.
===============================================================================