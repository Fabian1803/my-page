'use client'
import React, { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdCheckCircle, MdInfo, MdError, MdOpenInNew } from 'react-icons/md'

export default function NotificationsMenuCloud() {
    const [isOpen, setIsOpen] = useState(false);
    const dummyNotifications = [
        {
            id: '1',
            type: 'success',
            title: 'Instancia provisionada con éxito',
            time: 'Hace 5 min',
            desc: 'El nodo virtual e2-standard-2 ha sido asignado a la zona us-central1-a.'
        },
        {
            id: '2',
            type: 'info',
            title: 'Sincronización de certificados',
            time: 'Hace 1 hora',
            desc: 'Se completó la verificación del emisor IAM Authority Sync.'
        },
        {
            id: '3',
            type: 'error',
            title: 'Error de compilación en objeto',
            time: 'Hace 2 horas',
            desc: 'El artefacto no pudo registrar el archivo multimedia debido a un fallo de red.'
        }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <MdCheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />;
            case 'error': return <MdError size={16} className="text-red-600 shrink-0 mt-0.5" />;
            default: return <MdInfo size={16} className="text-[#3367d6] shrink-0 mt-0.5" />;
        }
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 cursor-pointer rounded-full transition-all focus:outline-none ${
                    isOpen ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'
                }`}
            >
                <IoMdNotificationsOutline size={24} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-[-60px] sm:right-0 mt-2 w-[calc(100vw-32px)] max-w-[380px] sm:w-96 bg-white border border-gray-300 rounded-sm shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                                Notificaciones de operaciones
                            </span>
                            <span className="text-[11px] text-[#3367d6] hover:underline cursor-pointer font-medium">
                                Marcar como leídas
                            </span>
                        </div>
                        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 block w-full">
                            {dummyNotifications.map((notif) => (
                                <div key={notif.id} className="p-4 flex gap-3 hover:bg-gray-50 transition-colors text-left w-full items-start">
                                    {getIcon(notif.type)}
                                    <div className="flex-1 min-w-0 space-y-0.5">
                                        <div className="flex justify-between items-baseline gap-2">
                                            <p className="text-xs font-medium text-gray-900 truncate">{notif.title}</p>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{notif.time}</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 font-normal leading-normal line-clamp-2">
                                            {notif.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2.5 text-center">
                            <div className="text-[#3367d6] hover:underline cursor-pointer flex items-center justify-center gap-1 text-xs font-medium">
                                <span>Ver todo el historial de registros</span>
                                <MdOpenInNew size={12} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}