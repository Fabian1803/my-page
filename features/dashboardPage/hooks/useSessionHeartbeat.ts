'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/features/loginPage/services/authService'
export function useSessionHeartbeat() {
    const router = useRouter()
    useEffect(() => {
        let isMounted = true
        const verify = async () => {
            const session = await authService.checkSession()
            if (!isMounted) return
            if (!session.authenticated) router.push('/login')
        }
        verify()
        const intervalId = setInterval(verify, 15 * 60 * 1000)
        const handleFocus = () => {
            verify()
        }
        window.addEventListener('focus', handleFocus)
        return () => {
            isMounted = false
            clearInterval(intervalId)
            window.removeEventListener('focus', handleFocus)
        }
    }, [router])
}
