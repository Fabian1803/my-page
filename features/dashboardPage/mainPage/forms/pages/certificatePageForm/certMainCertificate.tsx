'use client'
import React from 'react'
import {
    InputCloud,
    InputImageCloud,
    InstitutionInputCloud,
    TextAreaCloud,
    TagSelector,
    VignetteInput,
    VisibilityStateCloud
} from '../../components'
import CloudResourceContainer from '../../layout/CloudResourceContainer'
import { useCertificateForm } from './hooks'

export default function CertMainCertificate() {
    const {
        isEditing,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        instituto,
        setInstituto,
        fotoFile,
        setFotoFile,
        initialImageUrl,
        setInitialImageUrl,
        institutoFile,
        setInstitutoFile,
        initialInstitutoLogoUrl,
        compTags,
        setCompTags,
        compBullets,
        setCompBullets,
        esDestacado,
        setEsDestacado,
        loading,
        activeField,
        setActiveField,
        costosActuales,
        handleSubmit
    } = useCertificateForm()

    return (
        <CloudResourceContainer
            costosActuales={costosActuales}
            title={isEditing ? `Editar ${nombre || 'certificado'}` : "certificado"}
            activeField={activeField}
            setActiveField={setActiveField}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            backHref="/dashboard/certificados"
        >
            <InputCloud
                label="Nombre del certificado"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onClick={() => setActiveField('Nombre del certificado')}
                placeholder="Ej: Professional Cloud Architect, Meta Front-End Developer"
                required
            />

            <TextAreaCloud
                label="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                onClick={() => setActiveField('Descripción')}
                placeholder="Describe las competencias, conocimientos y alcance de la certificación..."
                required
            />

            <InputImageCloud
                label="Imagen del certificado / Credencial Oficial"
                value={fotoFile}
                initialUrl={initialImageUrl}
                onChange={(file) => {
                    setFotoFile(file)
                    if (file) setInitialImageUrl(null)
                }}
                onClick={() => setActiveField('Imagen del certificado')}
                placeholder="Haz clic para subir la imagen del certificado"
                required={!isEditing}
            />

            <InstitutionInputCloud
                value={instituto}
                onChange={setInstituto}
                file={institutoFile}
                onFileChange={setInstitutoFile}
                initialLogoUrl={initialInstitutoLogoUrl}
                onClick={() => setActiveField('Instituto')}
            />

            <TagSelector
                onClick={() => setActiveField('Categoría')}
                selectedTags={compTags}
                onTagsChange={setCompTags}
            />

            <VignetteInput
                bullets={compBullets}
                onClick={() => setActiveField('Viñetas')}
                onBulletsChange={setCompBullets}
            />

            <VisibilityStateCloud
                isActive={activeField === 'Visibilidad y Estado'}
                isDestacado={esDestacado}
                onToggle={() => setEsDestacado(!esDestacado)}
                onClick={() => setActiveField('Visibilidad y Estado')}
                title="Destacar en la página principal"
                description="Mostrar esta credencial en la portada y sección principal del portafolio."
            />
        </CloudResourceContainer>
    )
}