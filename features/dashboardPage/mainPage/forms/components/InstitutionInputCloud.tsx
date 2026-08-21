'use client'
import React, { useRef } from 'react';
import { MdInsertDriveFile, MdDelete } from 'react-icons/md';
import { BsLayersHalf } from 'react-icons/bs';

interface InstitutionTabsCloudProps {
    value?: string;
    onChange?: (nombre: string) => void;
    file?: File | null;
    onFileChange?: (file: File | null) => void;
    initialLogoUrl?: string | null;
    onClick?: () => void;
}

export default function InstitutionTabsCloud({ 
    value = '', 
    onChange, 
    file = null, 
    onFileChange, 
    initialLogoUrl,
    onClick 
}: InstitutionTabsCloudProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        if (onFileChange) {
            onFileChange(selectedFile);
        }
    };

    const handleRemoveFile = () => {
        if (onFileChange) onFileChange(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="w-full mt-4 space-y-4" onClick={onClick}>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">Institución de certificación (opcional)</h3>
                <p className="text-xs text-gray-500 font-normal">
                    Entidad emisora de la credencial (ej: Platzi, Google Cloud, CertiProf, Coursera, AWS).
                </p>
            </div>
            <div className="w-full">
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        placeholder="Nombre de la Institución (Ej: Google Cloud, CertiProf, Platzi)"
                        className="w-full pl-3 pr-10 py-2 border border-gray-400 rounded-sm text-xs text-gray-800 bg-white focus:outline-none focus:border-[#3367d6]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600 w-0 h-0" />
                </div>
                <div className="flex items-start gap-6 min-w-0">
                    <div className="flex-shrink-0 flex items-center justify-center text-[#3367d6] pt-1">
                        <BsLayersHalf size={48} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="grid grid-cols-2 gap-x-8 text-xs">
                            <div>
                                <span className="block text-gray-500 font-medium mb-0.5">Emisor</span>
                                <span className="block text-gray-800 font-normal">{value || 'Entidad Oficial'}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 font-medium mb-0.5">Almacenamiento</span>
                                <span className="block text-gray-800 font-normal">Cloud Storage Assets</span>
                            </div>
                        </div>
                        <div className="max-w-xs">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="flex items-center justify-between gap-3 bg-white px-3 py-1 border border-gray-300 rounded-sm min-h-[32px]">
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <MdInsertDriveFile size={16} className="text-gray-400 shrink-0" />
                                    <p className={`text-xs truncate flex-1 ${file || initialLogoUrl ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                                        {file ? file.name : (initialLogoUrl ? 'Logo actual cargado' : 'Logotipo institucional')}
                                    </p>
                                </div>

                                <div className="shrink-0">
                                    {file ? (
                                        <button
                                            type="button"
                                            onClick={handleRemoveFile}
                                            className="p-1 text-gray-400 hover:text-red-500 rounded-sm transition-colors cursor-pointer"
                                            title="Eliminar archivo seleccionado"
                                        >
                                            <MdDelete size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-2 py-0.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-sm hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            {initialLogoUrl ? 'Cambiar' : 'Subir'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}