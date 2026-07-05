// hooks/useLogin.ts
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { startAuthentication } from "@simplewebauthn/browser"

export function useLogin() {
    const router = useRouter()
    const [step, setStep] = useState<'email' | 'password'>('email')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [showFace, setShowFace] = useState(true)
    const ADMIN_EMAIL = "fabianriveraabian3@gmail.com"
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
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: ADMIN_EMAIL,
                    password
                })
            })
            const result = await response.json()
            if (!response.ok || !result.success) {
                setError('Contraseña incorrecta. Vuelve a intentarlo.')
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
    setError(null);
    setLoading(true);
    try {
        const challengeRes = await fetch("/api/auth/challenge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });
        if (!challengeRes.ok) throw new Error("Error challenge");

        const challengeData = await challengeRes.json();
        if (!challengeData.success) throw new Error("Error challenge data");

        const { options } = challengeData.data;
        const authResponse = await startAuthentication(options);

        const verifyRes = await fetch("/api/auth/verify-challenge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                body: authResponse,
                expectedChallenge: options.challenge,
                email: ADMIN_EMAIL,
            }),
        });

        if (!verifyRes.ok) throw new Error("Error verify");

        const verifyData = await verifyRes.json();
        if (!verifyData.success) throw new Error("Error verify data");

        router.refresh();
        router.push("/dashboard");

    } catch (err: any) {
        console.error("Error detallado de WebAuthn:", err);
        const mensajeError = err.message || "";
        if (mensajeError.includes("The operation was aborted") || mensajeError.includes("cancelled")) {
            setError("Autenticación biométrica cancelada.");
        } else if (mensajeError.includes("not allowed") || mensajeError.includes("failed")) {
            setError("Rostro o huella no reconocidos. Inténtalo de nuevo.");
        } else {
            setError("No se pudo verificar. Error del sistema.");
        }
    } finally {
        setLoading(false);
    }
};

    return {
        step, setStep, email, setEmail, password, setPassword,
        showPassword, setShowPassword, error, setError, loading,
        handleSubmit, handleBiometricLogin, showFace
    }
}