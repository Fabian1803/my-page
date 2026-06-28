'use client'
import InputAboutMe from './components/InputAboutMe';
import InputProfileImage from './components/InputProfileImage';
import InputTemplate from './components/InputTemplate';
import TextareaAboutMe from './components/TeaxAreaAboutMe';
import { useAboutMe } from './hooks/useAboutMe';

export default function AboutMePage() {
    const { nombre, setNombre, descripcion, setDescripcion, fotoPerfil, setFotoPerfil, previewUrl, setPreviewUrl, handleFotoChange, experiencias, agregarExperiencia, eliminarExperiencia, actualizarExperiencia, agregarVineta, eliminarVineta, actualizarVineta, handleSubmit, educacion, agregarEducacion, eliminarEducacion, actualizarEducacion, agregarVinetaEdu, eliminarVinetaEdu, actualizarVinetaEdu, loading } = useAboutMe()
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-[24px] font-normal tracking-tight text-[#202124]">
                    Enlaces y Redes Sociales
                </h1>
                <p className="text-sm text-[#5f6368] mt-1">
                    Gestiona los canales de comunicación and perfiles que se mostrarán en tu portafolio público.
                </p>
            </div>
            <div className="bg-white border border-[#dadce0] p-4 md:p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <InputAboutMe title="Nombre completo" nombre={nombre} setNombre={setNombre} />
                        <InputProfileImage fotoPerfil={fotoPerfil} setFotoPerfil={setFotoPerfil} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} handleFotoChange={handleFotoChange} />
                        <TextareaAboutMe title="Descripción" nombre={descripcion} setNombre={setDescripcion} />
                        <InputTemplate
                            titulo="Experiencia"
                            placeholderUno="Nombre de la empresa"
                            placeholderDos="Cargo (Ej: Senior Java Developer)"
                            experiencias={experiencias}
                            agregarExperiencia={agregarExperiencia}
                            eliminarExperiencia={eliminarExperiencia}
                            actualizarExperiencia={actualizarExperiencia}
                            agregarVineta={agregarVineta}
                            eliminarVineta={eliminarVineta}
                            actualizarVineta={actualizarVineta}
                        />
                        <InputTemplate
                            titulo="Educación"
                            placeholderUno="Institución Educativa (Ej: Universidad Tecnológica del Perú)"
                            placeholderDos="Título o Carrera (Ej: Ingeniería de Software)"
                            experiencias={educacion}
                            agregarExperiencia={agregarEducacion}
                            eliminarExperiencia={eliminarEducacion}
                            actualizarExperiencia={actualizarEducacion}
                            agregarVineta={agregarVinetaEdu}
                            eliminarVineta={eliminarVinetaEdu}
                            actualizarVineta={actualizarVinetaEdu}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-[#dadce0]">
                        <button
                            type="button"
                            className="px-5 py-2 text-sm font-medium text-[#0b57d0] hover:bg-blue-50/50 rounded-full transition-colors"
                        >
                            Descartar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`inline-flex items-center gap-1.5 px-6 py-2 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full transition-all shadow-sm ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}