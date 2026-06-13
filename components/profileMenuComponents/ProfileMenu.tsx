"use client";

import React from "react";
import Image from "next/image";
import { useProfileMenu } from "./useProfileMenu";
import { HiOutlineLogout } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { BiX } from "react-icons/bi";

interface ProfileMenuProps {
    left?: boolean;
    imageSrc?: string;
}

export default function ProfileMenu({ left, imageSrc }: ProfileMenuProps) {
    const { isOpen, menuRef, toggleMenu } = useProfileMenu();
    const user = {
        name: "Fabián Rivera Morales",
        email: "fabian.rivera.morales@gmail.com",
        initial: "F"
    };
    const GoogleRing = () => (
        <svg 
            className="absolute inset-0 w-full h-full -rotate-135 pointer-events-none" 
            viewBox="0 0 100 100"
        >
            <circle cx="50" cy="50" r="46" fill="none" stroke="#ea4335" strokeWidth="5" strokeDasharray="72.25 216.75" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#4285f4" strokeWidth="5" strokeDasharray="72.25 216.75" strokeDashoffset="-72.25" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#34a853" strokeWidth="5" strokeDasharray="72.25 216.75" strokeDashoffset="-144.5" />
            {/* Amarillo */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="#fbbc05" strokeWidth="5" strokeDasharray="72.25 216.75" strokeDashoffset="-216.75" />
        </svg>
    );

    return (
        <div ref={menuRef} className="relative inline-block select-none">
            
            {/* 🔴 CÍRCULO DISPARADOR (AVATAR PEQUEÑO) */}
            <button
                onClick={toggleMenu}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white font-medium text-base cursor-pointer focus:outline-none"
                title={`Cuenta de Google: ${user.name}`}
            >
                {/* Contenedor interno con padding para que la foto no tape el borde SVG */}
                <div className="w-[82%] h-[82%] rounded-full overflow-hidden flex items-center justify-center relative">
                    {imageSrc ? (
                        <Image 
                            src={imageSrc} 
                            alt="Profile" 
                            width={36} 
                            height={36} 
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span>{user.initial}</span>
                    )}
                </div>
                {/* Inyectamos el anillo multicolor encima */}
                <GoogleRing />
            </button>

            {/* PANEL DESPLEGABLE DE CUENTA */}
            {isOpen && (
                <div className={`
                    /* 📱 Comportamiento por defecto en MÓVIL (Pantalla Completa) */
                    fixed inset-0 w-full h-full rounded-none p-6 justify-center items-center
                    
                    /* 💻 Comportamiento a partir de pantallas SM (Flotante original) */
                    sm:absolute sm:inset-auto ${left ? 'sm:left-0' : 'sm:right-0'} sm:top-12 sm:w-80 sm:h-auto sm:rounded-3xl sm:p-5
                    
                    bg-[#e9eef6] border border-gray-300 shadow-xl z-50 animate-fade-in flex flex-col text-center gap-4
                `}>
                    
                    {/* ❌ BOTÓN DE CERRAR EXCLUSIVO PARA MÓVIL */}
                    <button 
                        onClick={toggleMenu} 
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 sm:hidden p-1 rounded-full hover:bg-gray-300/50"
                        title="Cerrar panel"
                    >
                        <BiX size={32} />
                    </button>

                    {/* Encabezado con el correo */}
                    <div className="text-xs font-medium text-gray-600 w-full truncate mt-8 sm:mt-0">
                        {user.email}
                    </div>

                    {/* 🔴 AVATAR GIGANTE DENTRO DEL PANEL */}
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-600 text-white font-normal text-3xl flex-shrink-0">
                        {/* Contenedor interno con espacio para el anillo */}
                        <div className="w-[84%] h-[84%] rounded-full overflow-hidden flex items-center justify-center relative">
                            {imageSrc ? (
                                <Image src={imageSrc} alt="Profile" fill className="object-cover" />
                            ) : (
                                <span>{user.initial}</span>
                            )}
                        </div>
                        {/* Inyectamos el mismo anillo aquí también */}
                        <GoogleRing />
                    </div>

                    {/* Nombre y Bienvenida */}
                    <div>
                        <h3 className="text-xl font-normal text-gray-900">¡Hola, {user.name.split(' ')[0]}!</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{user.name}</p>
                    </div>

                    {/* Acciones del Perfil */}
                    <div className="w-full max-w-sm bg-white rounded-2xl p-2 flex flex-col gap-1 shadow-sm border border-gray-100 mt-2 sm:mt-0">
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 sm:py-2.5 rounded-xl hover:bg-gray-100 text-sm text-gray-700 font-medium transition-colors"
                        >
                            <FaLinkedin className="text-xl text-blue-800" />
                            <span>Gestionar perfil profesional</span>
                        </a>
                        
                        <button 
                            onClick={() => alert("Simulación de cerrar sesión")}
                            className="flex items-center gap-3 px-4 py-3 sm:py-2.5 rounded-xl hover:bg-red-50 text-sm text-red-600 font-medium transition-colors border-t border-gray-50 mt-1"
                        >
                            <HiOutlineLogout className="text-xl" />
                            <span>Cerrar sesión de la cuenta</span>
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}