"use client"
import { useState, useEffect, useRef } from 'react'

export function useCodePediaHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [openSearchInput, setOpenSearchInput] = useState(false)
  const [openAppearance, setOpenAppearance] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)

  const searchContainerRef = useRef<HTMLDivElement>(null)
  const appearanceRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const sugerenciasMock = [
    { label: 'Java & Spring Boot', url: '/Codepedia/project/spring-boot' },
    { label: 'Docker & Microservicios', url: '/Codepedia/project/docker' },
    { label: 'Next.js & React', url: '/Codepedia/project/nextjs' },
    { label: 'Arquitectura Hexagonal', url: '/Codepedia/project/architecture' },
  ]
  
  const sugerenciasFiltradas = sugerenciasMock.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      
      if (openSearchInput && searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setOpenSearchInput(false)
        setShowSuggestions(false)
      }
      
      if (openAppearance && appearanceRef.current && !appearanceRef.current.contains(target)) {
        setOpenAppearance(false)
      }

      if (openUserMenu && userMenuRef.current && !userMenuRef.current.contains(target)) {
        setOpenUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openSearchInput, openAppearance, openUserMenu])

  return {
    searchQuery, setSearchQuery,
    showSuggestions, setShowSuggestions,
    openSearchInput, setOpenSearchInput,
    openAppearance, setOpenAppearance,
    openUserMenu, setOpenUserMenu,
    searchContainerRef, appearanceRef, userMenuRef,
    sugerenciasFiltradas
  }
}