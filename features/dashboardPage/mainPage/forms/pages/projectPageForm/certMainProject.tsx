'use client'
import React from 'react'
import {
    InputCloud,
    InputImageCloud,
    TextAreaCloud,
    TagSelector,
    VignetteInput,
    LinksProyect,
    DocumentationSectionsCloud,
    VisibilityStateCloud
} from '../../components'
import CloudResourceContainer from '../../layout/CloudResourceContainer'
import { useProjectForm } from './hooks'

export default function CertMainProject() {
    const {
        isEditing,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        fotoFile,
        setFotoFile,
        initialImageUrl,
        setInitialImageUrl,
        compTags,
        setCompTags,
        compBullets,
        setCompBullets,
        dynamicLinks,
        contentBlocks,
        esDestacado,
        setEsDestacado,
        loading,
        activeField,
        setActiveField,
        costosActuales,
        handleAddBlock,
        handleRemoveBlock,
        handleBlockChange,
        handleRegisterTiptapFile,
        handleAddLink,
        handleUrlChange,
        handleRemoveLink,
        handleSubmit
    } = useProjectForm()

    return (
        <CloudResourceContainer
            costosActuales={costosActuales}
            title={isEditing ? `Editar ${nombre || 'proyecto'}` : "proyecto"}
            activeField={activeField}
            setActiveField={setActiveField}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            backHref="/dashboard/proyectos"
        >
            <InputCloud
                label="Nombre del proyecto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onClick={() => setActiveField('Nombre del proyecto')}
                placeholder="Ej: Antigravity Cloud Engine, Portfolio Platform"
                required
            />

            <TextAreaCloud
                label="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                onClick={() => setActiveField('Descripción')}
                placeholder="Describe los objetivos, arquitectura y alcance del proyecto..."
                required
            />

            <TagSelector
                selectedTags={compTags}
                onClick={() => setActiveField('Categoría')}
                onTagsChange={setCompTags}
            />

            <VignetteInput
                bullets={compBullets}
                onClick={() => setActiveField('Viñetas')}
                onBulletsChange={setCompBullets}
            />

            <InputImageCloud
                label="Imagen de Portada del Proyecto"
                value={fotoFile}
                initialUrl={initialImageUrl}
                onChange={(file) => {
                    setFotoFile(file)
                    if (file) setInitialImageUrl(null)
                }}
                onClick={() => setActiveField('Imagen del proyecto')}
                placeholder="Haz clic para subir la imagen de portada"
                required={!isEditing}
            />

            <LinksProyect
                onClick={() => setActiveField('Enlaces')}
                dynamicLinks={dynamicLinks}
                onAddLink={handleAddLink}
                onUrlChange={handleUrlChange}
                onRemoveLink={handleRemoveLink}
            />

            <DocumentationSectionsCloud
                contentBlocks={contentBlocks}
                nombre={nombre}
                descripcion={descripcion}
                tags={compTags}
                onClick={() => setActiveField('Documentación')}
                onAddBlock={handleAddBlock}
                onRemoveBlock={handleRemoveBlock}
                onBlockChange={handleBlockChange}
                onRegisterTiptapFile={handleRegisterTiptapFile}
            />

            <VisibilityStateCloud
                isActive={activeField === 'Visibilidad y Estado'}
                isDestacado={esDestacado}
                onToggle={() => setEsDestacado(!esDestacado)}
                onClick={() => setActiveField('Visibilidad y Estado')}
                title="Destacar en la página principal"
                description="Mostrar este proyecto en la portada y sección principal del portafolio."
            />
        </CloudResourceContainer>
    )
}
