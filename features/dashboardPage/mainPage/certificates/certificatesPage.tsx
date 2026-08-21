'use client'
import React from 'react'
import { CertificatesHeaderBar, CertificatesGrid } from './components'
import { useCertificates } from './hooks'

export default function CertificatesPage() {
    const {
        certificados,
        isLoading,
        skeletons,
        filterTab,
        toggleFilterTab,
        cargarCertificados,
        handleToggleDestacado,
        handleDeleteCertificate
    } = useCertificates()

    return (
        <div className="max-w-[1600px] mx-auto flex flex-col h-full gap-1 bg-[#f9fafb] rounded-t-2xl min-h-[85vh]">
            <CertificatesHeaderBar
                isLoading={isLoading}
                filterTab={filterTab}
                onToggleFilterTab={toggleFilterTab}
                onRefresh={cargarCertificados}
            />

            <CertificatesGrid
                certificados={certificados}
                isLoading={isLoading}
                skeletons={skeletons}
                isFiltered={filterTab === 'destacados'}
                onResetFilter={toggleFilterTab}
                onToggleDestacado={handleToggleDestacado}
                onDelete={handleDeleteCertificate}
            />
        </div>
    )
}