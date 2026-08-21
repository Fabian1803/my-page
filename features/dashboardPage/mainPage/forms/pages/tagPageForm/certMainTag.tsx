'use client'
import React from 'react'
import { InputCloud, InputImageCloud, VisibilityStateCloud } from '../../components'
import CloudResourceContainer from '../../layout/CloudResourceContainer'
import { useTagForm } from './hooks'

export default function CertMainTag() {
    const {
        isEditing,
        nombre,
        setNombre,
        fotoFile,
        setFotoFile,
        initialImageUrl,
        setInitialImageUrl,
        esDestacado,
        setEsDestacado,
        loading,
        activeField,
        setActiveField,
        costosActuales,
        handleSubmit
    } = useTagForm()

    return (
        <CloudResourceContainer
            costosActuales={costosActuales}
            title={isEditing ? `Editar ${nombre || 'etiqueta'}` : "etiqueta"}
            activeField={activeField}
            setActiveField={setActiveField}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            backHref="/dashboard/etiquetas"
        >
            <InputCloud
                label="Nombre de la tecnología"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onClick={() => setActiveField('Nombre de la tecnología')}
                placeholder="Ej: Docker, Next.js, PostgreSQL, Kubernetes"
                required
            />

            <InputImageCloud
                label="Logotipo Oficial / Icono"
                value={fotoFile}
                initialUrl={initialImageUrl}
                onChange={(file) => {
                    setFotoFile(file)
                    if (file) setInitialImageUrl(null)
                }}
                onClick={() => setActiveField('Logotipo Oficial')}
                placeholder="Haz clic para subir PNG, SVG o JPEG"
                required={!isEditing}
            />

            <VisibilityStateCloud
                isActive={activeField === 'Visibilidad y Estado'}
                isDestacado={esDestacado}
                onToggle={() => setEsDestacado(!esDestacado)}
                onClick={() => setActiveField('Visibilidad y Estado')}
                title="Destacar en la página principal"
                description="Mostrar esta insignia en la cabecera y sección de tecnologías del portafolio público."
            />
        </CloudResourceContainer>
    )
}
