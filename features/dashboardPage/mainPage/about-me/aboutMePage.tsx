'use client'
import {
    InputAboutMe,
    InputProfileImage,
    TextareaAboutMe,
    InputTemplate,
    AboutMeHeaderBar,
    AboutMeActionBar
} from './components'
import { useAboutMe } from './hooks'

export default function AboutMePage() {
    const {
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        fotoPerfil,
        previewUrl,
        handleFotoChange,
        handleRemovePhoto,
        experiencias,
        agregarExperiencia,
        eliminarExperiencia,
        actualizarExperiencia,
        agregarVineta,
        eliminarVineta,
        actualizarVineta,
        handleSubmit,
        handleReset,
        educacion,
        agregarEducacion,
        eliminarEducacion,
        actualizarEducacion,
        agregarVinetaEdu,
        eliminarVinetaEdu,
        actualizarVinetaEdu,
        loading,
        loadingInitial
    } = useAboutMe()

    return (
        <div className="max-w-[1600px] mx-auto flex flex-col h-full gap-1 bg-[#f9fafb] rounded-t-2xl min-h-[85vh]">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <AboutMeHeaderBar />
                <div className="p-4 sm:p-6 space-y-6 bg-white flex-1">
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <InputAboutMe
                                title="Nombre Completo"
                                nombre={nombre}
                                setNombre={setNombre}
                            />
                            <InputProfileImage
                                fotoPerfil={fotoPerfil}
                                previewUrl={previewUrl}
                                handleFotoChange={handleFotoChange}
                                onRemoveImage={previewUrl ? handleRemovePhoto : undefined}
                            />
                            <TextareaAboutMe
                                title="Descripción"
                                nombre={descripcion}
                                setNombre={setDescripcion}
                            />
                        </div>
                    </div>

                    <InputTemplate
                        titulo="Experiencia Laboral"
                        placeholderUno="Nombre de la empresa u organización"
                        placeholderDos="Cargo o rol desempeñado (Ej: Full-Stack Engineer)"
                        experiencias={experiencias}
                        agregarExperiencia={agregarExperiencia}
                        eliminarExperiencia={eliminarExperiencia}
                        actualizarExperiencia={actualizarExperiencia}
                        agregarVineta={agregarVineta}
                        eliminarVineta={eliminarVineta}
                        actualizarVineta={actualizarVineta}
                    />

                    <InputTemplate
                        titulo="Educación y Formación"
                        placeholderUno="Institución Educativa (Ej: Universidad Tecnológica)"
                        placeholderDos="Título o Carrera (Ej: Ingeniería de Software)"
                        experiencias={educacion}
                        agregarExperiencia={agregarEducacion}
                        eliminarExperiencia={eliminarEducacion}
                        actualizarExperiencia={actualizarEducacion}
                        agregarVineta={agregarVinetaEdu}
                        eliminarVineta={eliminarVinetaEdu}
                        actualizarVineta={actualizarVinetaEdu}
                        ocultarLinks={true}
                    />
                </div>
                <AboutMeActionBar
                    loading={loading}
                    onReset={handleReset}
                />
            </form>
        </div>
    )
}