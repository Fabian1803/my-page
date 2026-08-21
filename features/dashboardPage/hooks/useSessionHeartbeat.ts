import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { sessionService } from '@/features/dashboardPage/services/sessionService'
export function useSessionHeartbeat() {
    const router = useRouter()
    useEffect(() => {
        let isMounted = true
        const verify = async () => {
            const session = await sessionService.checkSession()
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
