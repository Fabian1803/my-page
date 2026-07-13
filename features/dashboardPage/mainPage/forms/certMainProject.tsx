'use client'
import { InputCloud, InputImageCloud, TextAreaCloud } from './components';
import TagSelector from './components/tagSelector';
import VignetteInput from './components/vignetteInput';
import { useState } from 'react';
import DocumentationSectionsCloud from './components/DocumentationSectionsCloud';
import CloudResourceContainer from './layout/CloudResourceContainer';
const COSTOS_POR_CAMPO: Record<string, { item: string; itemCost: string; total: string }> = {
    'Nombre del proyecto': { item: "Premium Namespace Routing", itemCost: "$12.50", total: "$36,726.17" },
    'Descripción': { item: "Metadata Storage (Standard)", itemCost: "$0.45", total: "$36,714.12" },
    'Categoría': { item: "Object Storage SSD (100 GB)", itemCost: "$5.20", total: "$36,718.87" },
    'Viñetas': { item: "Verified IAM Authority Sync", itemCost: "$25.00", total: "$36,738.67" },
    'Imagen': { item: "Global Tag Cluster Provision", itemCost: "$8.10", total: "$36,721.77" },
    'Documentación': { item: "Audit Log Streaming Unit", itemCost: "$3.30", total: "$36,716.97" },
    'default': { item: "416 vCPU + 5,888 GB memory", itemCost: "$36,712.67", total: "$36,713.67" }
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
