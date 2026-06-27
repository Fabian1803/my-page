// hooks/useLogin.ts
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { startAuthentication } from "@simplewebauthn/browser" // 🚀 Importación necesaria

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

    // Dentro de hooks/useLogin.ts -> Reemplaza solo la función handleBiometricLogin:

const handleBiometricLogin = async () => {
    setError(null);
    setLoading(true);

    try {
        // 1. Pedimos el desafío global al backend (Ya no enviamos email en el body)
        const challengeRes = await fetch("/api/auth/challenge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}), // 🚀 Vacío, el dispositivo se identificará solo
        });

        // Verificamos si el endpoint respondió HTML u otro error antes de parsear JSON
        if (!challengeRes.ok) {
            throw new Error(`Error en el servidor: ${challengeRes.status}`);
        }

        const challengeData = await challengeRes.json();
        if (!challengeData.success) {
            throw new Error(challengeData.error || "No se pudo generar el desafío.");
        }

        const { options } = challengeData.data;

        // 2. Disparar el Face ID / Touch ID nativo del dispositivo de Apple
        // El navegador leerá el chip y te pedirá tu rostro/huella de inmediato
        const authResponse = await startAuthentication(options);

        // 3. Mandamos la firma criptográfica resultante de vuelta a verificar
        const verifyRes = await fetch("/api/auth/verify-challenge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                body: authResponse,
                expectedChallenge: options.challenge,
                email: ADMIN_EMAIL, // Aquí asociamos tu cuenta administradora al verificar la firma
            }),
        });

        if (!verifyRes.ok) {
            throw new Error(`Error en la verificación: ${verifyRes.status}`);
        }

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
            throw new Error(verifyData.error || "Verificación biométrica fallida.");
        }

        // 4. Éxito rotundo. Entramos al panel
        router.refresh();
        router.push("/dashboard");

    } catch (err: any) {
        console.error("Error en WebAuthn:", err);
        setError(err.message || "Autenticación biométrica fallida.");
    } finally {
        setLoading(false);
    }
};

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
        handleNextClick,
        handleBiometricLogin // 🚀 Ahora sí lo exportamos integrado de forma segura
    }
}