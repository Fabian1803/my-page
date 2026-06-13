"use client";

import React, { useEffect, useRef, useState } from "react";

interface UseImageCodepediaProps {
    id: string;
    imageSrc: string;
    title: string;
}

export function useImageCodepedia({ id, imageSrc, title }: UseImageCodepediaProps) {
    const [openImage, setOpenImage] = useState(false);
    const visorRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Función para alternar el modo pantalla completa
    const toggleFullscreen = () => {
        if (!visorRef.current) return;

        if (!document.fullscreenElement) {
            visorRef.current.requestFullscreen().catch((err) => {
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

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    // Manejo del Hash para abrir/cerrar como Wikipedia
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === `#media/${id}`) {
                setOpenImage(true);
            } else {
                setOpenImage(false);
            }
        };
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [id]);

    const openModal = () => {
        window.location.hash = `media/${id}`;
    };

    const closeModal = () => {
        if (window.location.hash === `#media/${id}`) {
            window.history.back();
        }
    };

    // Función para copiar la URL al portapapeles
    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.origin + imageSrc);
        alert("¡URL de la imagen copiada!");
    };

    // Función para descargar la imagen
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = imageSrc;
        link.download = title || "codepedia-download";
        link.click();
    };

    // Retornamos solo lo que la vista necesita consumir
    return {
        openImage,
        visorRef,
        isFullscreen,
        toggleFullscreen,
        openModal,
        closeModal,
        handleCopyUrl,
        handleDownload,
    };
}