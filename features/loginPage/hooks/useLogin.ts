import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService, ADMIN_EMAIL } from '../services/authService'
export function useLogin() {
    const router = useRouter()
    const [step, setStep] = useState<'email' | 'password'>('email')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [showFace, setShowFace] = useState(true)
    useEffect(() => {
        const interval = setInterval(() => {
            setShowFace((prev) => !prev)
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    const handleEmailNext = () => {
        setError(null)
        const cleanEmail = email.trim()
        if (!cleanEmail) {
            setError('Introduce un correo electrónico o un número de teléfono')
            return
        }
        if (cleanEmail !== ADMIN_EMAIL) {
            setError('No hemos podido encontrar tu Cuenta de Google')
            return
        }
        setStep('password')
    }
    const handleLoginSubmit = async () => {
        setError(null)
        if (!password) {
            setError('Introduce una contraseña')
            return
        }
        setLoading(true)
        try {
            const result = await authService.loginWithPassword(password, ADMIN_EMAIL)
            if (!result.success) {
                setError(result.error || 'Contraseña incorrecta. Vuelve a intentarlo.')
                return
            }
            router.push('/dashboard')
        } catch (err) {
            console.error("Error de login:", err)
            setError('No se pudo conectar. Error del sistema.')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (loading) return
        if (step === 'email') {
            handleEmailNext()
        } else {
            handleLoginSubmit()
        }
    }
    const handleBiometricLogin = async () => {
        setError(null)
        setLoading(true)
        try {
            const result = await authService.loginWithBiometrics(ADMIN_EMAIL)
            if (!result.success) {
                setError(result.error || 'No se pudo verificar la autenticación biométrica.')
                return
            }
            router.refresh()
            router.push('/dashboard')
        } catch (err: any) {
            console.error("Error en handleBiometricLogin:", err)
            setError(err.message || 'Error inesperado en biometría.')
        } finally {
            setLoading(false)
        }
    }
    return {
        step, setStep, email, setEmail, password, setPassword,
        showPassword, setShowPassword, error, setError, loading,
        handleSubmit, handleBiometricLogin, showFace
    }
}