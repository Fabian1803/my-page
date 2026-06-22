'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

type TextSize = 'small' | 'medium' | 'large'
type ColorTheme = 'auto' | 'light' | 'dark'
type width = 'standard' | 'full'

interface CodePediaContextProps {
    textSize: TextSize;
    color: ColorTheme;
    width: width;
    setTextSize: (size: TextSize) => void;
    setColor: (color: ColorTheme) => void;
    setWidth: (width: width) => void;
    changeForm: boolean;
    setChangeForm: (change: boolean) => void;
}

const CodePediaContext = createContext<CodePediaContextProps | undefined>(undefined)

export function CodePediaProvider({ children }: { children: React.ReactNode }) {
    const [textSize, setTextSize] = useState<TextSize>('medium')
    const [color, setColor] = useState<ColorTheme>('auto')
    const [width, setWidth] = useState<width>('standard')
    const [changeForm, setChangeForm] = useState(false)

    useEffect(() => {
        const savedColor = localStorage.getItem('codepedia-theme') as ColorTheme
        if (savedColor) {
            setColor(savedColor)
        }
    }, [])

    useEffect(() => {
        const root = document.documentElement
        
        if (color === 'dark') {
            root.classList.add('dark')
            localStorage.setItem('codepedia-theme', 'dark')
            return
        }

        if (color === 'light') {
            root.classList.remove('dark')
            localStorage.setItem('codepedia-theme', 'light')
            return
        }

        if (color === 'auto') {
            localStorage.removeItem('codepedia-theme') // Si vuelve a auto, limpiamos el storage
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const handleSystemChange = (e: MediaQueryListEvent) => {
                root.classList.toggle('dark', e.matches)
            }
            root.classList.toggle('dark', mediaQuery.matches)
            mediaQuery.addEventListener('change', handleSystemChange)
            return () => mediaQuery.removeEventListener('change', handleSystemChange)
        }
    }, [color])

    return (
        <CodePediaContext.Provider value={{ textSize, setTextSize, color, setColor, width, setWidth, changeForm, setChangeForm }}>
            {children}
        </CodePediaContext.Provider>
    )
}

export function useCodePedia() {
    const context = useContext(CodePediaContext)
    if (!context) throw new Error('useCodePedia debe usarse dentro de un CodePediaProvider')
    return context
}