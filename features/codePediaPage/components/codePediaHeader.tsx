"use client"
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import { BsEyeglasses } from "react-icons/bs"
import { IoIosSearch } from "react-icons/io"
import { TfiMoreAlt } from "react-icons/tfi"
import Link from 'next/link'
import React from 'react'
import { AiOutlineFileSearch } from 'react-icons/ai'
import CodePediaSection from './codePediaSection'
import { useCodePediaHeader } from '../hooks/useCodePediaHeader'

export default function CodePediaHeader() {
  const {
    searchQuery, setSearchQuery,
    showSuggestions, setShowSuggestions,
    openSearchInput, setOpenSearchInput,
    openAppearance, setOpenAppearance,
    openUserMenu, setOpenUserMenu,
    searchContainerRef, appearanceRef, userMenuRef,
    sugerenciasFiltradas
  } = useCodePediaHeader()
  const navButtonClass = "p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm"
  const dropDownOptionClass = "w-full text-left px-3 py-2 text-sm text-blue-600 dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm"

  return (
    <header className="h-17 px-4 lg:pl-9 lg:pr-12 bg-white dark:bg-[#101418] border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className={`h-full max-w-screen-2xl w-full 
       ${openSearchInput ? 'grid-cols-[auto_50_50] md:grid-cols-[auto_50_260]' : 'grid-cols-[50_auto_50_50_50] md:grid-cols-[50_auto_50_50_260]'}
      grid lg:grid-cols-[50_220_auto_260] items-center`}>
        
        <div className={`h-full flex items-center ${openSearchInput ? 'hidden lg:flex' : ''}`}>
          <button aria-label="Abrir menú" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiMenu size={20} />
          </button>
        </div>

        <div className={` ${openSearchInput ? 'hidden lg:flex' : ''}`}>
          <Link href="/Codepedia" className="flex items-center gap-2">
            <Image src="/wikiLog.webp" alt="Logo" width={45} height={45} className="object-contai hidden md:block" priority />
            <div className="flex flex-col justify-center">
              <Image src="/wikitittleLogo.webp" alt="Nombre" width={120} height={40} className="object-contain dark:content-[url('/wikiTitleLogoDark.webp')]" priority />
              <Image src="/wikiSubtexLogo.webp" alt="Subtexto" width={120} height={30} className="object-contain dark:content-[url('/wikiSubtextDark.webp')]" priority />
            </div>
          </Link>
        </div>
        
        <div 
          ref={searchContainerRef} 
          className={`h-full items-center lg:flex ${openSearchInput ? 'flex' : 'hidden '}`}
        >
          <div className="relative items-center grid grid-cols-[auto_70px] w-full lg:max-w-120">
            <div className="w-full grid grid-cols-[30px_auto] h-full dark:text-gray-300 border-y border-l dark:hover:border border-gray-700 dark:border-gray-500 dark:hover:border-gray-400 transition-colors duration-300 items-center px-2 bg-white dark:bg-transparent">
              <div className="flex justify-center">
                <IoIosSearch className="text-gray-500" size={20} />
              </div>
              <input
                id="cp-search"
                type="text"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Buscar en Codepedia"
                className="outline-none text-gray-900 dark:text-gray-100 bg-transparent w-full text-sm py-1"
              />
            </div>
            <Link href="/Codepedia/loquesea" className="px-1 text-center py-[5px] hover:bg-gray-200 dark:hover:bg-gray-900 dark:text-gray-300 font-bold text-sm border-1 border-gray-600 dark:border-gray-500 dark:hover:border-gray-400 transition-colors duration-300">Buscar</Link>

            {showSuggestions && searchQuery.length > 0 && (
              <div className="absolute top-full mt-[1px] left-0 w-[calc(100%-70px)] bg-white dark:bg-[#101418] border border-gray-300 dark:border-gray-600 shadow-lg z-50 flex flex-col overflow-hidden">
                {sugerenciasFiltradas.length > 0 && (
                  sugerenciasFiltradas.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url}
                      onClick={() => { setOpenSearchInput(false); setShowSuggestions(false); }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <div className="border border-gray-400">
                        <img src="/perfil.jpeg" alt="Sugerencia" width={35} height={35} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold dark:text-white">{item.label}</span>
                        <span className="truncate text-xs line-clamp-1">{item.label}</span>
                      </div>
                    </Link>
                  ))
                )}
                <Link 
                  href='/corelia/search'
                  onClick={() => { setOpenSearchInput(false); setShowSuggestions(false); }}
                  className="flex items-center gap-2 px-3 py-3 border-t border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <AiOutlineFileSearch size={20} />
                  <p className="text-sm">Busca el proyecto que estás buscando...</p>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className={`lg:hidden items-center flex justify-end py-2 px-1 ${openSearchInput ? 'hidden' : ''}`}>
          <button onClick={() => { setOpenSearchInput(!openSearchInput); setOpenAppearance(false); setOpenUserMenu(false); }} className={navButtonClass}>
            <IoIosSearch size={22} className="text-black dark:text-white" />
          </button>
        </div>

        <div ref={appearanceRef} className={`lg:hidden items-center flex justify-end py-2 px-1 relative ${openSearchInput ? 'hidden' : ''}`}>
          <button 
            onClick={() => { setOpenAppearance(!openAppearance); setOpenUserMenu(false); }} 
            className={navButtonClass}
          >
            <BsEyeglasses size={22} className="text-black dark:text-white" />
          </button>
          {openAppearance && (
            <div className="absolute top-15 right-0 w-35 bg-white dark:bg-[#101418] border border-gray-300 dark:border-gray-700 shadow-xl rounded-md p-4 z-50 animate-fade-in">
              <CodePediaSection />
            </div>
          )}
        </div>

        <div ref={userMenuRef} className="items-center flex justify-end py-2 px-1 md:hidden relative">
          <button 
            onClick={() => { setOpenUserMenu(!openUserMenu); setOpenAppearance(false); }}
            className={navButtonClass}
          >
            <TfiMoreAlt size={22} className="text-black dark:text-white" />
          </button>
          
          {openUserMenu && (
            <div className="absolute top-15 right-0 w-44 bg-white dark:bg-[#101418] border border-gray-300 dark:border-gray-700 shadow-xl rounded-md p-2 z-50 flex flex-col gap-1 animate-fade-in">
              <button className={dropDownOptionClass}>Donaciones</button>
              <button className={dropDownOptionClass}>Crear una cuenta</button>
              <button className={dropDownOptionClass}>Acceder</button>
            </div>
          )}
        </div>
        <div className="md:flex items-center justify-end hidden">
          <ul className="flex gap-2 text-sm text-blue-600 dark:text-blue-300 ">
            <li>Donaciones</li>
            <li>Crear una cuenta</li>
            <li>Acceder</li>
          </ul>
        </div>
      </div>
    </header>
  )
}