'use client'
import React, { useState } from 'react'
import { useInputTemplateProps } from './hooks/useCv'
import {
    CvHeaderBar,
    CvTabsNav,
    CvMetadataCard,
    CvViewerCard,
    CvActionBar
} from './components'

export default function CvPage() {
    const {
        fileInputRef,
        cvFile,
        pdfPreviewUrl,
        loading,
        handleFileChange,
        handleRemoveCV,
        handleSubmit
    } = useInputTemplateProps()

    const [activeTab, setActiveTab] = useState<'details' | 'permissions' | 'versions'>('details')

    const obtenerNombrePdf = () => {
        if (cvFile) return cvFile.name;
        if (pdfPreviewUrl) {
            const partes = pdfPreviewUrl.split('/');
            const nombreConTimestamp = partes[partes.length - 1];
            const indiceGuion = nombreConTimestamp.indexOf('-');
            return indiceGuion !== -1 ? nombreConTimestamp.substring(indiceGuion + 1) : nombreConTimestamp;
        }
        return 'curriculum-vitae.pdf';
    };

    const fileName = obtenerNombrePdf()

    return (
        <div className="max-w-[1600px] mx-auto flex flex-col h-full gap-1 bg-[#f9fafb] rounded-t-2xl min-h-[85vh]">
            <input
                type="file"
                ref={fileInputRef}
                className="sr-only hidden"
                accept=".pdf"
                onChange={handleFileChange}
            />
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <CvHeaderBar
                    pdfPreviewUrl={pdfPreviewUrl}
                    loading={loading}
                    onUploadClick={() => fileInputRef.current?.click()}
                    onRefresh={() => window.location.reload()}
                />
                <CvTabsNav
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                />
                <CvMetadataCard
                    cvFile={cvFile}
                    pdfPreviewUrl={pdfPreviewUrl}
                    fileName={fileName}
                />
                <CvViewerCard
                    pdfPreviewUrl={pdfPreviewUrl}
                    fileName={fileName}
                    onUploadClick={() => fileInputRef.current?.click()}
                    onRemoveClick={handleRemoveCV}
                />
                <CvActionBar
                    cvFile={cvFile}
                    pdfPreviewUrl={pdfPreviewUrl}
                    loading={loading}
                    onDiscard={handleRemoveCV}
                />
            </form>
        </div>
    )
}