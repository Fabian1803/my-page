'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '../services/authService'

export function useLogin() {
    const router = useRouter()
    const [step, setStep] = useState<'email' | 'password'>('email')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [nombre, setNombre] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [showFace, setShowFace] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFace((prev) => !prev)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const loadProfile = async () => {
            const profile = await authService.getProfileMetadata()
            if (profile) {
                if (profile.url_imagen) setAvatarUrl(profile.url_imagen)
                if (profile.nombre) setNombre(profile.nombre)
            }
        }
        loadProfile()
    }, [])

    const handleEmailNext = () => {
        setError(null)
        const cleanEmail = email.trim()
        if (!cleanEmail) {
            setError('Introduce un correo electrónico o un número de teléfono')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(cleanEmail)) {
            setError('Introduce un correo electrónico válido')
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
            const result = await authService.loginWithPassword(password, email)
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
            const result = await authService.loginWithBiometrics(email)
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
        step,
        setStep,
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        avatarUrl,
        nombre,
        error,
        setError,
        loading,
        handleSubmit,
        handleBiometricLogin,
        showFace
    }
}