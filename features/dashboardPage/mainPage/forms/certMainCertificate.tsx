'use client'
import { useState } from 'react'
import { InputCloud, InputImageCloud, InstitutionInputCloud, TextAreaCloud, TagSelector, VignetteInput } from './components';
import CloudResourceContainer from './layout/CloudResourceContainer';

const COSTOS_POR_CAMPO: Record<string, { item: string; itemCost: string; total: string }> = {
    'Nombre del certificado': { item: "Premium Namespace Routing", itemCost: "$12.50", total: "$36,726.17" },
    'Descripción': { item: "Metadata Storage (Standard)", itemCost: "$0.45", total: "$36,714.12" },
    'Imagen': { item: "Object Storage SSD (100 GB)", itemCost: "$5.20", total: "$36,718.87" },
    'Instituto': { item: "Verified IAM Authority Sync", itemCost: "$25.00", total: "$36,738.67" },
    'Categoría': { item: "Global Tag Cluster Provision", itemCost: "$8.10", total: "$36,721.77" },
    'Viñetas': { item: "Audit Log Streaming Unit", itemCost: "$3.30", total: "$36,716.97" },
    'default': { item: "416 vCPU + 5,888 GB memory", itemCost: "$36,712.67", total: "$36,713.67" }
};

export default function CertMainCertificate() {
    const [compTags, setCompTags] = useState<string[]>([])
    const [compBullets, setCompBullets] = useState<string[]>([])
    const [activeField, setActiveField] = useState<string>('Nombre del certificado')
    const costosActuales = COSTOS_POR_CAMPO[activeField] || COSTOS_POR_CAMPO['default']
    return (
        <CloudResourceContainer
            costosActuales={costosActuales}
            title="certificado"
            activeField={activeField}
            setActiveField={setActiveField}
        >
            <InputCloud
                label="Nombre del certificado"
                value=""
                onChange={() => { }}
                onClick={() => setActiveField('Nombre del certificado')}
                placeholder="Ingrese el nombre del certificado"
            />
            <TextAreaCloud
                label="Descripción"
                onClick={() => setActiveField('Descripción')}
                value=""
                onChange={() => { }}
                placeholder="Ingrese la descripción del certificado"
            />
            <InputImageCloud
                label="Imagen del certificado"
                onClick={() => setActiveField('Imagen')}
                value={null}
                onChange={() => { }}
            />
            <InstitutionInputCloud
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

        </CloudResourceContainer>
    )
}