"use client"
import { useState, useEffect, useRef } from 'react'

export interface SuggestionItem {
  id: string;
  label: string;
  url: string;
  image?: string;
  type?: 'project' | 'skill';
}

export function useCodePediaHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [openSearchInput, setOpenSearchInput] = useState(false)
  const [openAppearance, setOpenAppearance] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const [items, setItems] = useState<SuggestionItem[]>([])
  
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const appearanceRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [resProyectos, resCategorias] = await Promise.all([
          fetch('/api/resources?tipo=PROYECTO').then(r => r.json()).catch(() => ({ data: [] })),
          fetch('/api/categorias').then(r => r.json()).catch(() => ({ data: [] }))
        ]);

        const proyectos = Array.isArray(resProyectos.data) ? resProyectos.data : (Array.isArray(resProyectos) ? resProyectos : []);
        const categorias = Array.isArray(resCategorias.data) ? resCategorias.data : (Array.isArray(resCategorias) ? resCategorias : []);

        const mappedProjects: SuggestionItem[] = proyectos.map((p: any) => ({
          id: p.id,
          label: p.nombre,
          url: `/Codepedia/project/${p.id}`,
          image: p.imagenPrincipalUrl || p.miniaturaUrl || '/WikiLog.webp',
          type: 'project'
        }));

        const mappedSkills: SuggestionItem[] = categorias.map((c: any) => ({
          id: c.id,
          label: c.nombre,
          url: `/Codepedia/${encodeURIComponent(c.nombre)}`,
          image: c.imagenUrl || '/WikiLog.webp',
          type: 'skill'
        }));

        setItems([...mappedProjects, ...mappedSkills]);
      } catch (err) {
        console.error("Error cargando sugerencias en header:", err);
      }
    }
    loadData();
  }, []);

  const sugerenciasFiltradas = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
  ).slice(0, 6);

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