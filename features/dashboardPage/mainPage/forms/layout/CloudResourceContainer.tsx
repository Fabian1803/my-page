'use client'
import React, { useState, useEffect } from 'react'
import DecorationRight from './decorationRight';
import { FaArrowLeft } from 'react-icons/fa';
import { RiCodeBoxFill } from 'react-icons/ri';
import DecorationLeft from './decorationLeft';

interface CloudResourceContainerProps {
    children: React.ReactNode;
    title: string;
    activeField: string;
    setActiveField: (field: string) => void;
    costosActuales: {
        item: string;
        itemCost: string;
        total: string;
    };
}

export default function CloudResourceContainer({ 
    children, 
    costosActuales, 
    title, 
    activeField, 
    setActiveField 
}: CloudResourceContainerProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative max-w-[1600px] mx-auto bg-white rounded-t-2xl h-full select-none min-h-[80vh]">
            {isLoading && (
                <div className="absolute inset-0 bg-white z-50 flex items-center justify-center rounded-t-2xl">
                    <div className="relative w-12 h-12">
                        <svg className="animate-spin w-full h-full" viewBox="0 0 50 50">
                            <circle
                                className="text-[#3367d6] stroke-current"
                                cx="25"
                                cy="25"
                                r="20"
                                fill="none"
                                strokeWidth="4"
                                strokeLinecap="round"
                                style={{
                                    strokeDasharray: '1, 150',
                                    strokeDashoffset: '0',
                                    animation: 'gcp-dash 1.5s ease-in-out infinite'
                                }}
                            />
                        </svg>
                    </div>

                    <style jsx global>{`
                        @keyframes gcp-dash {
                            0% {
                                stroke-dasharray: 1, 150;
                                stroke-dashoffset: 0;
                            }
                            50% {
                                stroke-dasharray: 90, 150;
                                stroke-dashoffset: -35;
                            }
                            100% {
                                stroke-dasharray: 90, 150;
                                stroke-dashoffset: -124;
                            }
                        }
                    `}</style>
                </div>
            )}
            <div className="flex items-center px-2 gap-4 w-full border-b border-[#dbdce0] py-2">
                <button>
                    <FaArrowLeft size={22} className="text-[#1a6fd8]" />
                </button>
                <h1 className="text-xl">Crear un {title}</h1>
            </div>
            <div className="grid grid-cols-1 min-[930px]:grid-cols-[auto_400px] xl:grid-cols-[250px_auto_400px]">
                <DecorationLeft activeField={activeField} title={title} />
                <div
                    className="pt-2 pb-20 border-x border-[#dbdce0] px-4 py-2 flex flex-col gap-4 max-h-none overflow-y-visible min-[930px]:max-h-[78.2vh] min-[930px]:overflow-y-auto"
                    onFocusCapture={(e) => {
                        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
                        if (target.placeholder?.includes("nombre del " + title)) setActiveField('Nombre del ' + title);
                        if (target.placeholder?.includes("descripción del " + title)) setActiveField('Descripción');
                    }}
                >
                    <h1 className="text-xl font-medium">Información del {title}</h1>
                    {children}
                </div>
                <DecorationRight
                    activeItem={costosActuales.item}
                    activeCost={costosActuales.itemCost}
                    totalCost={costosActuales.total}
                />
                <hr className="hidden xl:block border-[#dbdce0]" />
                <div className="col-span-1 xl:col-start-2 border-t border-[#dbdce0] py-4 px-6 gap-2 flex flex-wrap items-center">
                    <button className="bg-[#3367d6] hover:bg-[#2a56b9] text-white px-4 py-2 rounded-sm font-medium transition-colors shadow-sm">
                        Create
                    </button>
                    <button className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-sm font-medium transition-colors">
                        Cancel
                    </button>
                    <div className="text-[#3367d6] hidden sm:flex hover:bg-[#e8f0fe] gap-1.5 items-center px-3 py-2 rounded-sm cursor-pointer font-medium transition-colors">
                        <RiCodeBoxFill size={16} className="text-[#3367d6]" />
                        <span>Equivalent code</span>
                    </div>
                </div>
                <hr className="hidden min-[930px]:block border-[#dbdce0]" />
            </div>
        </div>
    )
}