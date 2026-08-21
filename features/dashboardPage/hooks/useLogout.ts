import { useRouter } from "next/navigation"
import { useState } from "react"
import { sessionService } from "@/features/dashboardPage/services/sessionService"
export function useLogout() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const logout = async () => {
        setIsLoading(true)
        try {
            const success = await sessionService.logout()
            if (success) {
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