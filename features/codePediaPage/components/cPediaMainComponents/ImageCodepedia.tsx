"use client";

import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { BiDownload, BiExitFullscreen, BiFullscreen, BiMinusFront, BiX } from "react-icons/bi";

interface ImageCodepediaProps {
    title: string
    description: string
    imageSrc: string
    id: string
}

export default function ImageCodepedia({ title, description, imageSrc, id }: ImageCodepediaProps) {
    const [openImage, setOpenImage] = useState(false)
    const visorRef = useRef<HTMLDivElement>(null); // El control remoto
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Función para alternar el modo pantalla completa
    const toggleFullscreen = () => {
        if (!visorRef.current) return;

        if (!document.fullscreenElement) {
            visorRef.current.requestFullscreen()
                .catch((err) => {
                    alert(`Error al intentar activar pantalla completa: ${err.message}`);
                });
        } else {
            document.exitFullscreen();
        }
    };

    // Escuchar cambios en el estado de fullscreen del navegador
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Manejo del Hash para abrir/cerrar como Wikipedia
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === `#media/${id}`) {
                setOpenImage(true)
            } else {
                setOpenImage(false)
            }
        }
        handleHashChange()
        window.addEventListener("hashchange", handleHashChange)
        return () => window.removeEventListener("hashchange", handleHashChange)
    }, [id])

    const openModal = () => {
        window.location.hash = `media/${id}`
    }

    const closeModal = () => {
        if (window.location.hash === `#media/${id}`) {
            window.history.back()
        }
    }

    return (
        <>
            {/* Tarjeta pequeña en la grilla */}
            <div className="@container border bg-gray-100 border-gray-400 p-1 grid grid-rows-[auto_auto] gap-2">
                <button
                    onClick={openModal}
                    className="w-full h-full border border-gray-400 cursor-zoom-in"
                >
                    <Image src={imageSrc} alt="CodePediaImage" width={400} height={200} priority className="w-full h-auto object-cover" />
                </button>
                <p className="text-md text-center line-clamp-3 @md:line-clamp-1 break-words">{title}</p>
            </div>

            {/* MODAL DEL VISOR (Estilo Wikipedia) */}
            {openImage && (
                <div
                    ref={visorRef} // 👈 1. ¡CLAVE! Aquí asignamos la ref para que funcione el Fullscreen
                    className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center select-none"
                >
                    {/* Contenedor principal de la imagen */}
                    <div className="relative w-full h-[85vh] flex items-center justify-center bg-black">

                        {/* Sub-contenedor relativo corregido */}
                        <div className="relative w-full h-full flex items-center justify-center">

                            <Image
                                src={imageSrc}
                                alt="CodePediaImage Preview"
                                fill
                                className="object-contain"
                            />

                            {/* 🔴 BOTONES ARRIBA A LA DERECHA */}
                            <div className="absolute top-4 right-4 flex flex-col items-center gap-4 bg-black/40 p-2 rounded-md backdrop-blur-sm z-10">
                                <button
                                    onClick={closeModal}
                                    className="text-gray-300 hover:text-white transition-colors"
                                    title="Cerrar"
                                >
                                    <BiX size={36} />
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="text-gray-300 hover:text-white transition-colors"
                                    title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                                >
                                    {isFullscreen ? <BiExitFullscreen size={26} /> : <BiFullscreen size={26} />}
                                </button>
                            </div>

                            {/* 🔵 BOTONES ABAJO A LA DERECHA */}
                            <div className="absolute bottom-4 right-4 flex flex-col items-center gap-4 bg-black/40 p-2 rounded-md backdrop-blur-sm z-10">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.origin + imageSrc);
                                        alert("¡URL de la imagen copiada!");
                                    }}
                                    className="text-gray-300 hover:text-white transition-colors"
                                    title="Copiar URL"
                                >
                                    <BiMinusFront size={26} />
                                </button>
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = imageSrc;
                                        link.download = title || "codepedia-download"; // Usamos title por seguridad si description es muy larga para un archivo
                                        link.click();
                                    }}
                                    className="text-gray-300 hover:text-white transition-colors"
                                    title="Descargar imagen"
                                >
                                    <BiDownload size={26} />
                                </button>
                            </div>

                        </div>
                    </div>
                    {/* SECCIÓN INFERIOR: DESCRIPCIÓN (Fondo blanco abajo - Se oculta en Fullscreen) */}
                    {!isFullscreen && (
                        <div className="w-full h-[15vh] flex items-start justify-center px-4 bg-white border-t border-gray-200 animate-fade-in">
                            {description && (
                                <p className="mt-4 text-base font-normal text-gray-800 max-w-3xl text-center break-words">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}

                </div>
            )}
        </>
    )
}