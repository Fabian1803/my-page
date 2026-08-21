'use client'
import React from 'react'
import { CertificateItem } from '../services/certificateServices'
import CertificateCard from './CertificateCard'
import CertificatesEmptyState from './CertificatesEmptyState'

interface CertificatesGridProps {
    certificados: CertificateItem[];
    isLoading: boolean;
    skeletons: number[];
    isFiltered: boolean;
    onResetFilter: () => void;
    onToggleDestacado: (id: string, current: boolean) => void;
    onDelete: (id: string, nombre: string) => void;
}

export default function CertificatesGrid({
    certificados,
    isLoading,
    skeletons,
    isFiltered,
    onResetFilter,
    onToggleDestacado,
    onDelete
}: CertificatesGridProps) {
    if (isLoading && certificados.length === 0) {
        return (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
                {skeletons.map((id) => (
                    <div key={id} className="bg-white border border-[#dadce0] rounded-xl p-4 sm:p-5 animate-pulse space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2 w-2/3">
                                <div className="h-4 bg-gray-200 rounded w-1/3" />
                                <div className="h-5 bg-gray-200 rounded w-full" />
                            </div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full" />
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="flex gap-2">
                            <div className="h-5 bg-gray-200 rounded w-16" />
                            <div className="h-5 bg-gray-200 rounded w-20" />
                        </div>
                        <div className="w-full h-52 bg-gray-200 rounded-lg" />
                    </div>
                ))}
            </div>
        )
    }

    if (!isLoading && certificados.length === 0) {
        return (
            <CertificatesEmptyState
                isFiltered={isFiltered}
                onResetFilter={onResetFilter}
            />
        )
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
            {certificados.map((cert) => (
                <CertificateCard
                    key={cert.id}
                    certificate={cert}
                    onToggleDestacado={onToggleDestacado}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
