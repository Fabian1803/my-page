'use client'
import { useState, useEffect, useCallback } from 'react'

export interface UserProfileData {
    nombre: string;
    email: string;
    avatarUrl: string | null;
    isLoading: boolean;
}

export function useUserProfile() {
    const [nombre, setNombre] = useState<string>('Fabian Rivera')
    const [email, setEmail] = useState<string>('fabianriveraabian3@gmail.com')
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchProfileData = useCallback(async () => {
        try {
            setIsLoading(true)
            const metaRes = await fetch('/api/metadata')
            if (metaRes.ok) {
                const json = await metaRes.json()
                const metaData = json?.data || json
                if (metaData) {
                    if (metaData.nombre) setNombre(metaData.nombre)
                    if (metaData.url_imagen) setAvatarUrl(metaData.url_imagen)
                    else setAvatarUrl(null)
                }
            }

            const authRes = await fetch('/api/auth/me')
            if (authRes.ok) {
                const authData = await authRes.json()
                if (authData.success && authData.user?.email) {
                    setEmail(authData.user.email)
                }
            }
        } catch (error) {
            console.error('Error cargando datos del perfil de usuario:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProfileData()

        const handleProfileUpdated = (e: Event) => {
            const customEvent = e as CustomEvent<{ nombre?: string; url_imagen?: string }>
            if (customEvent.detail) {
                if (customEvent.detail.nombre) setNombre(customEvent.detail.nombre)
                if (customEvent.detail.url_imagen !== undefined) setAvatarUrl(customEvent.detail.url_imagen || null)
            } else {
                fetchProfileData()
            }
        }

        window.addEventListener('profile-updated', handleProfileUpdated)
        return () => {
            window.removeEventListener('profile-updated', handleProfileUpdated)
        }
    }, [fetchProfileData])

    return {
        nombre,
        email,
        avatarUrl,
        isLoading,
        refetch: fetchProfileData
    }
}
