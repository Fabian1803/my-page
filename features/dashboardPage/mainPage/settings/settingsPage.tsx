'use client'
import React from 'react'
import { useSettingsPage } from './hooks/useSettingsPage'
import {
    SettingsHeaderBar,
    EmailSection,
    PasswordSection,
    BiometricsSection,
} from './components'
import { MdCheckCircle, MdErrorOutline } from 'react-icons/md'

export default function SettingsPage() {
    const {
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
    } = useSettingsPage()
    return (
        <div className="max-w-[1600px] mx-auto flex flex-col h-full bg-[#f9fafb] rounded-t-2xl min-h-[85vh]">
            <SettingsHeaderBar onRefresh={loadProfile} isLoading={loadingProfile} />
            <div className="p-4 sm:p-6 space-y-6 bg-white flex-1">
                {message && (
                    <div
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border text-xs sm:text-sm font-medium transition-all ${message.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}
                    >
                        {message.type === 'success' ? (
                            <MdCheckCircle size={18} className="text-green-600 shrink-0" />
                        ) : (
                            <MdErrorOutline size={18} className="text-red-600 shrink-0" />
                        )}
                        <span>{message.text}</span>
                    </div>
                )}
                <EmailSection
                    email={email}
                    newEmail={newEmail}
                    setNewEmail={setNewEmail}
                    emailPassword={emailPassword}
                    setEmailPassword={setEmailPassword}
                    emailLoading={emailLoading}
                    onUpdateEmail={handleUpdateEmail}
                />
                <PasswordSection
                    currentPassword={currentPassword}
                    setCurrentPassword={setCurrentPassword}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    passwordLoading={passwordLoading}
                    onUpdatePassword={handleUpdatePassword}
                />
                <BiometricsSection
                    devices={devices}
                    biometricLoading={biometricLoading}
                    deletingDeviceId={deletingDeviceId}
                    onRegisterBiometrics={handleRegisterBiometrics}
                    onDeleteDevice={handleDeleteDevice}
                />
            </div>
        </div>
    )
}
