import { FabianPageMain } from '@/features/fabianPage'
import { getResourcesUseCase } from '@/server/resources/infrastructure/dependencies'
import { getCategoriasUseCase } from '@/server/categoria/infrastructure/dependencies'

export const revalidate = 3600;

export default async function Page() {
  let proyectosRaw: any = [];
  let categoriasRaw: any = [];
  let imagenesRaw: any = [];
  let certificadosRaw: any = [];

  try {
    const results = await Promise.all([
      getResourcesUseCase.execute({ tipo: "PROYECTO" }),
      getCategoriasUseCase.execute(),
      getResourcesUseCase.execute({ tipo: "IMAGEN_INTERNA", limit: 3 }),
      getResourcesUseCase.execute({ tipo: "CERTIFICADO", limit: 3 })
    ]);
    proyectosRaw = results[0];
    categoriasRaw = results[1];
    imagenesRaw = results[2];
    certificadosRaw = results[3];
  } catch (error) {
    console.error("Error al cargar datos en /fabianrivera:", error);
  }

  const proyectos = Array.isArray(proyectosRaw) ? proyectosRaw : [];
  const categorias = Array.isArray(categoriasRaw) ? categoriasRaw : [];
  const imagenes = Array.isArray(imagenesRaw) ? imagenesRaw : [];
  const certificados = Array.isArray(certificadosRaw) ? certificadosRaw : [];

  const skills = categorias
    .map((cat: any) => {
      const proyectosRelacionados = proyectos.filter((p: any) => {
        const pCats = p.categorias || [];
        return pCats.some((c: any) => {
          const catName = typeof c === 'string' ? c : c.nombre;
          return catName?.trim().toLowerCase() === cat.nombre?.trim().toLowerCase();
        });
      });

      return {
        id: cat.id,
        nombre: cat.nombre,
        imagenUrl: cat.imagenUrl,
        proyectos: proyectosRelacionados.slice(0, 3).map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion
        }))
      };
    })
    .filter((s) => s.proyectos.length > 0);

  return (
    <FabianPageMain
      data={{
        proyectos,
        skills,
        imagenes,
        certificados
      }}
    />
  );
}
