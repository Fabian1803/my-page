"use client"
import { useEffect, useState } from 'react'
export default function CertificatesPage() {
     const [isLoading, setIsLoading] = useState(true)
      useEffect(() => {
          const timer = setTimeout(() => {
              setIsLoading(false)
          }, 1000)
  
          return () => clearTimeout(timer)
      }, [])
  
      const proyectos = [
          {
              id: 1,
              image: '/Flog.webp',
              nombre: 'Corelia IA',
              descripcion: 'Sistema automatizado de inventarios basado en una arquitectura de microservicios con Spring Boot, NestJS, Kong y la API de Gemini.'
          },
          {
              id: 2,
              image: '/Flog.webp',
              nombre: 'Foro Hub API',
              descripcion: 'REST API construida con Spring Boot, Spring Security para autenticación JWT, migraciones con Flyway y operaciones CRUD completas.'
          },
          {
              id: 3,
              image: '/Flog.webp',
              nombre: 'Vision Transformer Deforestation',
              descripcion: 'Modelo de Deep Learning basado en Vision Transformers (ViT) diseñado para la detección temprana de la deforestación mediante análisis de imágenes satelitales.'
          }
      ]
  
      const skeletons = [1, 2, 3, 4]
  
      return (
          <>
              <div className="flex justify-between items-center mb-6">
                  <h1 className="text-[24px] font-normal tracking-tight text-[#202124]">
                      Certificaciones
                  </h1>
                  <span className="text-xs font-semibold px-3 py-1 bg-[#70a4f1]/20 text-[#0b57d0] rounded-full">
                      {isLoading ? 'Cargando...' : `${proyectos.length} en total`}
                  </span>
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {isLoading && skeletons.map((id) => (
                      <div
                          key={id}
                          className="bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between animate-pulse"
                      >
                          <div>
                              <div className="w-full h-40 bg-gray-200 border-b border-gray-100 flex items-center justify-center">
                                  <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                                  </svg>
                              </div>
                              <div className="px-3 py-4 space-y-3">
                                  <div className="h-5 bg-gray-200 rounded-md w-1/3" />
                                  <div className="space-y-2">
                                      <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                                      <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                                  </div>
                              </div>
                          </div>
                          <div className="px-3 pb-3 pt-1">
                              <div className="w-full bg-gray-200 h-10" />
                          </div>
                      </div>
                  ))}
                  {!isLoading && proyectos.map((proyecto) => (
                      <div
                          key={proyecto.id}
                          className="bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200"
                      >
                          <div>
                              <div className="w-full h-40 bg-gray-100 relative flex items-center justify-center border-b border-gray-100">
                                  <img
                                      src={proyecto.image}
                                      alt={proyecto.nombre}
                                      className="h-16 w-auto object-contain opacity-80"
                                  />
                              </div>
                              <div className="p-3">
                                  <h2 className="text-lg font-bold text-gray-900 mb-1 truncate">
                                      {proyecto.nombre}
                                  </h2>
                                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                      {proyecto.descripcion}
                                  </p>
                              </div>
                          </div>
                          <div className="px-3 pb-3 pt-1">
                              <button className="w-full bg-[#0b57d0] hover:bg-[#0a48b3] text-white text-sm font-semibold py-2.5 px-4 transition-colors shadow-sm">
                                  Ver detalle
                              </button>
                          </div>
                      </div>
                  ))}
                  
              </div>
          </>
  )
}
