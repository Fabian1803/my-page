'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useLogin } from './hooks/useLogin'

export default function LoginPage() {
    const {
        step,
        setStep,
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        error,
        loading,
        setError,
        handleNextClick
    } = useLogin()

    return (
        <div className="min-h-screen text-black flex flex-col justify-between bg-[#f0f4f9] p-6 sm:p-10 md:p-16 lg:p-4 lg:items-center lg:justify-center">
            <div className="hidden max-md:block h-4" />
            <div className="w-full lg:max-w-[1050px] bg-transparent lg:bg-white border-none lg:border lg:border-[#dadce0] lg:rounded-3xl lg:p-12 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 lg:gap-16">
                <div className="w-full md:w-[45%] lg:w-1/2">
                    <div className="mb-6 md:mb-4 -ml-4">
                        <Image src="/FLogo.webp" alt="Logo" width={60} height={60} />
                    </div>
                    <h1 className="text-[28px] md:text-[38px] text-[#202124] mb-3 font-normal tracking-tight leading-tight transition-all duration-300">
                        {step === 'email' ? 'Inicia sesión' : 'Te damos la bienvenida'}
                    </h1>
                    {step === 'email' ? (
                        <p className="text-[16px] md:text-[16px] text-[#202124] transition-all duration-300">
                            Utiliza tu cuenta de Google
                        </p>
                    ) : (
                        <div
                            onClick={() => { setStep('email'); setError(null); }}
                            className="rounded-full flex gap-2.5 border border-[#dadce0] pl-1 pr-3 py-1 w-max h-8 justify-center items-center bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                            <div className="rounded-full overflow-hidden w-6 h-6 flex items-center justify-center shrink-0">
                                <Image
                                    src="/perfil.jpeg"
                                    alt="Profile"
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-[14px] text-[#3c4043] font-medium tracking-normal">
                                fabianriveraabian3@gmail.com
                            </p>
                        </div>
                    )}

                </div>
                <div className="w-full md:w-[45%] lg:w-1/2 mt-2 flex flex-col">
                    <div className="w-full relative pt-4 overflow-hidden min-h-[250px] md:min-h-[220px]">
                        <div
                            className={`w-full transition-all duration-300 ease-in-out absolute top-4 left-0
                                ${step === 'email'
                                    ? 'translate-x-0 opacity-100 pointer-events-auto'
                                    : '-translate-x-full opacity-0 pointer-events-none'
                                }`}
                        >
                            <div className="relative mb-6 w-full">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="peer w-full px-3 py-4 border border-[#747775] rounded-[4px] focus:outline-none focus:border-2 focus:border-[#0b57d0] transition-all placeholder-transparent bg-transparent"
                                    placeholder="Correo electrónico o teléfono"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-3 -top-2.5 px-1 bg-[#f0f4f9] lg:bg-white text-[#747775] text-[16px] transition-all 
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-[#747775] 
                                    peer-focus:-top-2.5 peer-focus:text-[#0b57d0] peer-focus:text-[12px]"
                                >
                                    Correo electrónico o teléfono
                                </label>
                            </div>

                            {error && (
                                <p className="text-[#b3261e] text-[12px] -mt-4 mb-4">{error}</p>
                            )}

                            <p className="text-[#0b57d0] font-medium text-[14px] mb-8 cursor-pointer hover:underline">
                                ¿Has olvidado tu correo electrónico?
                            </p>

                            <p className="text-[14px] text-[#444746] mb-6 leading-relaxed w-full">
                                ¿No es tu ordenador? Usa el modo Invitado para iniciar sesión de forma privada.
                                <span className="text-[#0b57d0] font-medium cursor-pointer ml-1 hover:underline">
                                    <span className="lg:hidden">Más información sobre cómo usar el modo Invitado</span>
                                    <span className="hidden lg:inline">Más información</span>
                                </span>
                            </p>
                        </div>
                        <div
                            className={`w-full transition-all duration-300 ease-in-out absolute top-4 left-0
                                ${step === 'password'
                                    ? 'translate-x-0 opacity-100 pointer-events-auto'
                                    : 'translate-x-full opacity-0 pointer-events-none'
                                }`}
                        >
                            <div className="relative mb-6 w-full">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="peer w-full px-3 py-4 border border-[#747775] rounded-[4px] focus:outline-none focus:border-2 focus:border-[#0b57d0] transition-all placeholder-transparent bg-transparent"
                                    placeholder="Introduce tu contraseña"
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-3 -top-2.5 px-1 bg-[#f0f4f9] lg:bg-white text-[#747775] text-[16px] transition-all 
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-[#747775] 
                                    peer-focus:-top-2.5 peer-focus:text-[#0b57d0] peer-focus:text-[12px]"
                                >
                                    Introduce tu contraseña
                                </label>
                            </div>

                            {error && (
                                <p className="text-[#b3261e] text-[12px] -mt-4 mb-4">{error}</p>
                            )}

                            <div className="flex items-center gap-3 mb-8">
                                <input
                                    type="checkbox"
                                    id="show-password"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    className="w-4 h-4 accent-[#0b57d0] rounded cursor-pointer"
                                />
                                <label htmlFor="show-password" className="text-[14px] text-[#202124] cursor-pointer select-none">
                                    Mostrar contraseña
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-between items-center md:justify-end md:gap-4 w-full pt-4 bg-transparent z-10">
                        {step === 'email' ? (
                            <>
                                <span className="text-[#0b57d0] font-medium text-[14px] cursor-pointer hover:underline py-2">
                                    Crear cuenta
                                </span>
                                <button
                                    onClick={handleNextClick}
                                    className="bg-[#0b57d0] text-white px-6 py-2.5 rounded-full font-medium text-[14px] hover:bg-[#155bd3]"
                                >
                                    Siguiente
                                </button>
                            </>
                        ) : (
                            <>
                                <span
                                    onClick={() => { setStep('email'); setError(null); }}
                                    className="text-[#0b57d0] font-medium text-[14px] cursor-pointer hover:underline py-2"
                                >
                                    Atrás
                                </span>
                                <button
                                    onClick={handleNextClick}
                                    disabled={loading} // <-- Para evitar múltiples clicks si la red va lenta
                                    className="bg-[#0b57d0] text-white px-6 py-2.5 rounded-full font-medium text-[14px] hover:bg-[#155bd3]"
                                >
                                    {loading ? 'Cargando...' : 'Siguiente'}
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>

            <div className="w-full lg:max-w-[1050px] flex justify-between text-sm text-black p-4">
                <span className="cursor-pointer hover:underline">Español (España) ▾</span>
                <div className="flex gap-6 md:gap-8">
                    <span className="cursor-pointer hover:underline">Ayuda</span>
                    <span className="cursor-pointer hover:underline">Privacidad</span>
                    <span className="cursor-pointer hover:underline">Términos</span>
                </div>
            </div>

        </div>
    )
}