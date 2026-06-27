import { useRouter } from "next/navigation"
import { useState } from "react"
export function useLogout() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const logout = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.ok) {
                router.refresh()
                router.push('/login')
            } else {
                console.error("Error al intentar cerrar sesión")
            }
        } catch (error) {
            console.error("Error de red en el logout:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return { logout, isLoading }
}