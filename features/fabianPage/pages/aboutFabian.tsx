'use client'
import Image from "next/image"
import SearchMapComponent from "../components/searchMapComponent"
import Link from "next/link"

interface Experiencia {
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFin: string;
  vinetas: string[];
  urlWeb?: string;
  urlMasInfo?: string;
}

interface AboutFabianProps {
  metadata: {
    nombre?: string;
    descripcion?: string;
    url_imagen?: string;
    experiencias?: Experiencia[];
    educacion?: Experiencia[];
  };
}

export default function AboutFabian({ metadata }: AboutFabianProps) {
  const abouttext = {
    name: metadata?.nombre || "",
    description: metadata?.descripcion || "",
    image: metadata?.url_imagen || "/profile.jpeg",
    experiences: metadata?.experiencias || [],
    education: metadata?.educacion || [],
  }

  return (
    <SearchMapComponent>
      <div className="max-w-4xl pt-8 pb-50 px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
        <section className="block md:flex md:flex-row gap-8 items-start justify-between border-b border-gray-100 pb-8 overflow-hidden">
          <div className="float-right ml-4 mb-2 md:float-none md:ml-0 md:mb-0 md:order-last shrink-0">
            <Image
              src={abouttext.image}
              alt="Fabián Rivera"
              width={100}
              height={100}
              priority
              className="rounded-xl border border-blue-50 shadow-sm object-contain md:w-[140px] md:h-[140px]"
            />
          </div>

          <div className="md:flex-1 space-y-3 text-left">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {abouttext.name}
            </h1>
            <p className="text-sm sm:text-base text-justify text-gray-600 leading-relaxed max-w-2xl">
              {abouttext.description}
            </p>
          </div>
          <div className="clear-both md:hidden" />
        </section>
        <section className="py-5 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Experiencia
          </h2>
          {abouttext.experiences.length === 0 ? (
            <p className="text-sm text-gray-500">No hay experiencias profesionales registradas.</p>
          ) : (
            abouttext.experiences.map((exp, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-gray-200 ml-3 space-y-3">
                <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-gray-400 ring-4 ring-blue-50" />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-base font-bold text-gray-900">{exp.empresa}</h3>
                    <span className="text-gray-400 hidden sm:inline">•</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{exp.cargo}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">{exp.fechaInicio} - {exp.fechaFin}</p>
                </div>
                
                {exp.vinetas && exp.vinetas.length > 0 && (
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <ul className="list-disc list-inside space-y-1.5 pl-1">
                      {exp.vinetas.map((subvineta, vinetaIndex) => (
                        subvineta.trim() && <li key={vinetaIndex}>{subvineta}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {(exp.urlWeb || exp.urlMasInfo) && (
                  <div className="flex gap-4 text-xs font-semibold pt-1">
                    {exp.urlWeb && (
                      <a
                        href={exp.urlWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0b57d0] hover:underline"
                      >
                        Sitio Web
                      </a>
                    )}
                    {exp.urlMasInfo && (
                      <a 
                        href={exp.urlMasInfo}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-gray-500 hover:text-gray-800 hover:underline"
                      >
                        Más información
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </section>
        <section className="py-5 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Educación y Certificaciones
          </h2>
          {abouttext.education.length === 0 ? (
            <p className="text-sm text-gray-500">No hay registros educativos guardados.</p>
          ) : (
            abouttext.education.map((edu, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-gray-200 ml-3 space-y-3">
                <div className="absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full bg-gray-400 ring-4 ring-gray-50" />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-base font-bold text-gray-900">{edu.empresa}</h3> {/* Institución */}
                    <span className="text-gray-400 hidden sm:inline">•</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">{edu.cargo}</span> {/* Grado/Carrera */}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">{edu.fechaInicio} - {edu.fechaFin}</p>
                </div>
                
                {edu.vinetas && edu.vinetas.length > 0 && (
                  <div className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      {edu.vinetas.map((subvineta, vinetaIndex) => (
                        subvineta.trim() && <li key={vinetaIndex}>{subvineta}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </section>

      </div>
    </SearchMapComponent>
  )
}