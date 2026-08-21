'use client'
import { InputCloud, InputImageCloud, TextAreaCloud } from './components';
import TagSelector from './components/TagSelector';
import VignetteInput from './components/VignetteInput';
import { useState } from 'react';
import DocumentationSectionsCloud from './components/DocumentationSectionsCloud';
import CloudResourceContainer from './layout/CloudResourceContainer';
import LinksProyect from './components/LinksProyect';
const COSTOS_POR_CAMPO: Record<string, { item: string; itemCost: string; total: string }> = {
    'Nombre del proyecto': { item: "E2 Standard vCPU Provisioning", itemCost: "$25.40", total: "$36,738.90" },
    'Descripción': { item: "Cloud Storage Bucket Metadata", itemCost: "$0.15", total: "$36,713.65" },
    'Categoría': { item: "Global VPC Network Tag Routing", itemCost: "$7.30", total: "$36,720.80" },
    'Viñetas': { item: "Artifact Registry Streaming Logs", itemCost: "$3.80", total: "$36,717.30" },
    'Imagen': { item: "SSD Persistent Disk (Source Image)", itemCost: "$17.00", total: "$36,730.50" },
    'Enlaces': { item: "External Load Balancer IP Frontend", itemCost: "$14.60", total: "$36,728.10" },
    'Documentación': { item: "Cloud Run Instance Cache Layer", itemCost: "$5.20", total: "$36,718.70" },
    'default': { item: "Compute Node base infrastructure", itemCost: "$36,713.50", total: "$36,713.50" }
};
export default function CertMainProject() {
    const [compTags, setCompTags] = useState<string[]>([])
    const [compBullets, setCompBullets] = useState<string[]>([])
    const [activeField, setActiveField] = useState<string>('Nombre del proyecto')
    const costosActuales = COSTOS_POR_CAMPO[activeField] || COSTOS_POR_CAMPO['default']
    const [contentBlocks, setContentBlocks] = useState<{ id: string; content: string }[]>([]);
    const handleAddBlock = () => {
        const newBlock = {
            id: crypto.randomUUID(), // Genera un ID único para la lista
            content: ''
        };
        setContentBlocks([...contentBlocks, newBlock]);
    };

    const handleRemoveBlock = (id: string) => {
        setContentBlocks(contentBlocks.filter(block => block.id !== id));
    };

    const handleBlockChange = (id: string, value: string) => {
        setContentBlocks(contentBlocks.map(block =>
            block.id === id ? { ...block, content: value } : block
        ));
    };

    const handleRegisterTiptapFile = (fileId: string, file: File) => {
        console.log("Archivo registrado:", fileId, file);
    };
    return (
        <CloudResourceContainer
            costosActuales={costosActuales}
            title="proyecto"
            activeField={activeField}
            setActiveField={setActiveField}
        >

            <InputCloud
                onClick={() => setActiveField('Nombre del proyecto')}
                label="Nombre del proyecto"
                value=""
                onChange={() => { }}
                placeholder="Ingrese el nombre del proyecto"
            />

            <TextAreaCloud
                label="Descripción"
                onClick={() => setActiveField('Descripción')}
                value=""
                onChange={() => { }}
                placeholder="Ingrese la descripción del proyecto"
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
                label="Imagen del proyecto"
                onClick={() => setActiveField('Imagen')}
                value={null}
                onChange={() => { }}
            />
            <LinksProyect
                onClick={() => setActiveField('Enlaces')}
                dynamicLinks={[]}
                onAddLink={() => { }}
                onUrlChange={() => { }}
                onRemoveLink={() => { }}
            />
            <DocumentationSectionsCloud
                contentBlocks={contentBlocks}
                nombre={"nombre"}
                onClick={() => setActiveField('Documentación')}
                descripcion={"descripcion"}
                tags={compTags}
                onAddBlock={handleAddBlock}
                onRemoveBlock={handleRemoveBlock}
                onBlockChange={handleBlockChange}
                onRegisterTiptapFile={handleRegisterTiptapFile}
            />
        </CloudResourceContainer>
    )
}
