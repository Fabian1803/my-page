'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

type TextSize = 'small' | 'medium' | 'large'
type ColorTheme = 'auto' | 'light' | 'dark'

interface CodePediaContextProps {
    textSize: TextSize;
    color: ColorTheme;
    setTextSize: (size: TextSize) => void;
    setColor: (color: ColorTheme) => void;
}

const CodePediaContext = createContext<CodePediaContextProps | undefined>(undefined)
export function CodePediaProvider({ children }: { children: React.ReactNode }) {
    const [textSize, setTextSize] = useState<TextSize>('medium')
    const [color, setColor] = useState<ColorTheme>('auto')
    useEffect(() => {
        const root = document.documentElement
        if (color === 'dark') {
            root.classList.add('dark')
            return
        }

        if (color === 'light') {
            root.classList.remove('dark')
            return
        }

        if (color === 'auto') {
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
        <CodePediaContext.Provider value={{ textSize, setTextSize, color, setColor }}>
            {children}
        </CodePediaContext.Provider>
    )
}

export function useCodePedia() {
    const context = useContext(CodePediaContext)
    if (!context) throw new Error('useCodePedia debe usarse dentro de un CodePediaProvider')
    return context
}