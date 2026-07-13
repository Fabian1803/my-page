'use client'
import React, { useState, useRef, useEffect } from 'react';
import { MdInsertDriveFile, MdDelete } from 'react-icons/md';
import { BsLayersHalf } from 'react-icons/bs'; // Ícono para simular los bloques azules de Cloud

interface InstitutionTabsCloudProps {
    onChange?: (data: { tipo: string; nombre: string; file: File | null }) => void;
    onClick?: () => void;
}

export default function InstitutionTabsCloud({ onChange, onClick }: InstitutionTabsCloudProps) {

    const [nombre, setNombre] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <div className="w-full mt-4 space-y-4" onClick={onClick}>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">Institución de certificación (opcional)</h3>
                <p className="text-xs text-gray-500 font-normal">
                    Choose a machine type with preset amounts of vCPUs and memory that suit most workloads.
                </p>
            </div>
            <div className="w-full">
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre de la Institución (416 vCPU, 208 core, 5,888 GB memory)"
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
                                <span className="block text-gray-500 font-medium mb-0.5">vCPU</span>
                                <span className="block text-gray-800 font-normal">416 (208 cores)</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 font-medium mb-0.5">Memory</span>
                                <span className="block text-gray-800 font-normal">5,888 GB</span>
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
                                    <p className={`text-xs truncate flex-1 ${file ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                                        {file ? file.name : 'Ningún archivo seleccionado'}
                                    </p>
                                </div>

                                <div className="shrink-0">
                                    {file ? (
                                        <button
                                            type="button"
                                            onClick={() => setFile(null)}
                                            className="p-1 text-gray-400 hover:text-red-500 rounded-sm transition-colors cursor-pointer"
                                        >
                                            <MdDelete size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-2 py-0.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-sm hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            Subir
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