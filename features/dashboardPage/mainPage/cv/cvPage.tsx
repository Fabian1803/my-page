'use client'
import React, { useState } from 'react'
import { useCv } from './hooks'
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
        loadingInitial,
        handleFileChange,
        handleDiscardLocalChanges,
        handleDeleteCv,
        handleSubmit,
        cargarCvExistente
    } = useCv()

    const [activeTab, setActiveTab] = useState<'details' | 'permissions' | 'versions'>('details')

    const obtenerNombrePdf = () => {
        if (cvFile) return cvFile.name;
        if (pdfPreviewUrl) {
            const partes = pdfPreviewUrl.split('/');
            const nombreConTimestamp = partes[partes.length - 1];
            const indiceGuion = nombreConTimestamp.indexOf('-');
            return indiceGuion !== -1 ? decodeURIComponent(nombreConTimestamp.substring(indiceGuion + 1)) : decodeURIComponent(nombreConTimestamp);
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
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
            />
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <CvHeaderBar
                    pdfPreviewUrl={pdfPreviewUrl}
                    loading={loading}
                    onUploadClick={() => fileInputRef.current?.click()}
                    onRefresh={cargarCvExistente}
                />
                <CvTabsNav
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                />

                {loadingInitial ? (
                    <div className="flex-1 bg-white p-12 flex flex-col items-center justify-center min-h-[50vh]">
                        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-sm text-gray-500 font-medium">Consultando objeto en Cloud Storage...</p>
                    </div>
                ) : (
                    <>
                        <CvMetadataCard
                            cvFile={cvFile}
                            pdfPreviewUrl={pdfPreviewUrl}
                            fileName={fileName}
                        />
                        <CvViewerCard
                            pdfPreviewUrl={pdfPreviewUrl}
                            fileName={fileName}
                            onUploadClick={() => fileInputRef.current?.click()}
                            onRemoveClick={handleDeleteCv}
                        />
                    </>
                )}

                <CvActionBar
                    cvFile={cvFile}
                    pdfPreviewUrl={pdfPreviewUrl}
                    loading={loading}
                    onDiscard={cvFile ? handleDiscardLocalChanges : handleDeleteCv}
                />
            </form>
        </div>
    )
}