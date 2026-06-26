import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useLogin() {
    const router = useRouter()
    const [step, setStep] = useState<'email' | 'password'>('email')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const ADMIN_EMAIL = "fabianriveraabian3@gmail.com"
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
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email: email.trim(), 
                    password 
                })
            })
            const result = await response.json()
            if (!response.ok || !result.success) {
                setError(result.error || 'Contraseña incorrecta. Vuelve a intentarlo.')
                return
            }
            router.push('/dashboard')

        } catch (err) {
            setError('Hubo un error al intentar conectar con el servidor.')
        } finally {
            setLoading(false)
        }
    }

    const handleNextClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (step === 'email') {
            handleEmailNext()
        } else {
            handleLoginSubmit()
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
        error,
        setError,
        loading,
        handleNextClick
    }
}