'use client'
import { useState, useEffect, useCallback } from 'react'
import { settingServices, DeviceItem } from '../services/settingServices'

export function useSettingsPage() {
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [email, setEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [emailPassword, setEmailPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [devices, setDevices] = useState<DeviceItem[]>([])
    const [emailLoading, setEmailLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [biometricLoading, setBiometricLoading] = useState(false)
    const [deletingDeviceId, setDeletingDeviceId] = useState<string | null>(null)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const notify = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 6000)
    }

    const loadProfile = useCallback(async () => {
        setLoadingProfile(true)
        const result = await settingServices.getSecurityProfile()
        if (result.success && result.user) {
            setEmail(result.user.email)
            setNewEmail(result.user.email)
            setDevices(result.devices || [])
        } else {
            notify('error', result.error || 'Error al cargar perfil de seguridad.')
        }
        setLoadingProfile(false)
    }, [])

    useEffect(() => {
        loadProfile()
    }, [loadProfile])

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newEmail || !emailPassword) {
            notify('error', 'Por favor ingresa el nuevo correo y tu contraseña actual.')
            return
        }

        setEmailLoading(true)
        const res = await settingServices.updateEmail(newEmail, emailPassword)
        if (res.success) {
            notify('success', 'Correo electrónico actualizado correctamente.')
            setEmail(newEmail)
            setEmailPassword('')
        } else {
            notify('error', res.error || 'No se pudo actualizar el correo.')
        }
        setEmailLoading(false)
    }

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentPassword || !newPassword || !confirmPassword) {
            notify('error', 'Todos los campos de contraseña son requeridos.')
            return
        }
        if (newPassword !== confirmPassword) {
            notify('error', 'La nueva contraseña y la confirmación no coinciden.')
            return
        }
        if (newPassword.length < 6) {
            notify('error', 'La nueva contraseña debe contener al menos 6 caracteres.')
            return
        }

        setPasswordLoading(true)
        const res = await settingServices.updatePassword(currentPassword, newPassword)
        if (res.success) {
            notify('success', 'Contraseña actualizada con éxito.')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } else {
            notify('error', res.error || 'Error al actualizar contraseña.')
        }
        setPasswordLoading(false)
    }

    const handleRegisterBiometrics = async () => {
        setBiometricLoading(true)
        const res = await settingServices.registerBiometrics()
        if (res.success) {
            notify('success', '¡Dispositivo biométrico (Touch ID / Face ID) vinculado exitosamente!')
            await loadProfile()
        } else {
            notify('error', res.error || 'No se pudo registrar la biometría.')
        }
        setBiometricLoading(false)
    }

    const handleDeleteDevice = async (credentialId: string) => {
        if (!confirm('¿Estás seguro de que deseas desvincular este dispositivo biométrico?')) return

        setDeletingDeviceId(credentialId)
        const res = await settingServices.deleteDevice(credentialId)
        if (res.success) {
            notify('success', 'Dispositivo biométrico desvinculado.')
            setDevices(prev => prev.filter(d => d.credentialId !== credentialId))
        } else {
            notify('error', res.error || 'Error al eliminar el dispositivo.')
        }
        setDeletingDeviceId(null)
    }

    return {
        email,
        newEmail,
        setNewEmail,
        emailPassword,
        setEmailPassword,
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        devices,
        loadingProfile,
        emailLoading,
        passwordLoading,
        biometricLoading,
        deletingDeviceId,
        message,
        handleUpdateEmail,
        handleUpdatePassword,
        handleRegisterBiometrics,
        handleDeleteDevice,
        loadProfile,
    }
}
