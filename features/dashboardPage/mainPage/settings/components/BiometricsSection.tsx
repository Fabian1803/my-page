'use client'
import React from 'react'
import { TbFingerprintScan } from 'react-icons/tb'
import { MdDelete, MdAdd, MdInfoOutline, MdDevices } from 'react-icons/md'
import { DeviceItem } from '../services/settingServices'

interface BiometricsSectionProps {
    devices: DeviceItem[];
    biometricLoading: boolean;
    deletingDeviceId: string | null;
    onRegisterBiometrics: () => void;
    onDeleteDevice: (credentialId: string) => void;
}

export default function BiometricsSection({
    devices,
    biometricLoading,
    deletingDeviceId,
    onRegisterBiometrics,
    onDeleteDevice,
}: BiometricsSectionProps) {
    return (
        <div className="flex flex-col gap-4 min-w-0 pt-5 border-t border-[#dadce0]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-blue-50 text-[#0c68e0] flex items-center justify-center shrink-0">
                        <TbFingerprintScan size={20} />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-800">
                            Autenticación Biométrica (Passkeys / Touch ID)
                        </h3>
                        <span className="text-[11px] text-gray-400">
                            {devices.length} dispositivo(s) activo(s)
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onRegisterBiometrics}
                    disabled={biometricLoading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 bg-white hover:bg-gray-100 border border-[#dadce0] text-[#0c68e0] text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                >
                    <MdAdd size={16} />
                    <span>{biometricLoading ? "Verificando sensor..." : "Vincular este dispositivo"}</span>
                </button>
            </div>

            {/* Banner informativo GCP */}
            <div className="flex items-start gap-2.5 p-3.5 bg-[#e8f0fe] border border-[#d2e3fc] rounded-lg text-xs text-[#1967d2]">
                <MdInfoOutline size={18} className="shrink-0 mt-0.5" />
                <p>
                    <span className="font-semibold block sm:inline">Acceso biométrico instantáneo: </span>
                    Permite iniciar sesión rápidamente en este navegador utilizando Touch ID, Face ID o sensor dactilar sin contraseña.
                </p>
            </div>

            {/* Listado de dispositivos en diseño limpio GCP */}
            <div className="space-y-3">
                {devices.length > 0 ? (
                    <div className="border border-[#dadce0] rounded-lg bg-white overflow-hidden shadow-2xs divide-y divide-gray-100">
                        {devices.map((device, index) => (
                            <div
                                key={device.id || index}
                                className="px-4 py-3 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors gap-3"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded bg-blue-50 text-[#0c68e0] flex items-center justify-center shrink-0">
                                        <MdDevices size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-gray-800 font-mono truncate">
                                            Credencial #{index + 1}: {device.credentialId.slice(0, 20)}...
                                        </p>
                                        <p className="text-[11px] text-gray-500">
                                            Contador de accesos: <span className="font-semibold text-gray-700">{device.counter}</span>
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onDeleteDevice(device.credentialId)}
                                    disabled={deletingDeviceId === device.credentialId}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                                    title="Desvincular este dispositivo"
                                >
                                    <MdDelete size={17} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 border-2 border-dashed border-[#dadce0] rounded-lg bg-[#f8f9fa] flex flex-col items-center justify-center gap-2">
                        <TbFingerprintScan size={32} className="text-gray-400" />
                        <p className="text-xs font-medium text-gray-600">
                            No hay dispositivos biométricos registrados actualmente.
                        </p>
                        <button
                            type="button"
                            onClick={onRegisterBiometrics}
                            disabled={biometricLoading}
                            className="text-xs font-semibold text-[#0c68e0] hover:underline cursor-pointer"
                        >
                            + Vincular Touch ID / Face ID en este equipo
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
