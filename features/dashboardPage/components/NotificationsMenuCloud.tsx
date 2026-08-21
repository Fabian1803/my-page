'use client'
import React, { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdCheckCircle, MdInfo, MdError, MdDeleteSweep } from 'react-icons/md'
import { useNotifications, CloudNotification } from '../context/NotificationContext'

export default function NotificationsMenuCloud() {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotifications();

    const getIcon = (type: CloudNotification['type']) => {
        switch (type) {
            case 'success': return <MdCheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />;
            case 'error': return <MdError size={16} className="text-red-600 shrink-0 mt-0.5" />;
            default: return <MdInfo size={16} className="text-[#3367d6] shrink-0 mt-0.5" />;
        }
    }

    const formatRelativeTime = (timestamp: number) => {
        const diff = Math.floor((Date.now() - timestamp) / 1000);
        if (diff < 60) return 'Hace un momento';
        if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
        if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
        return `Hace ${Math.floor(diff / 86400)} d`;
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen && unreadCount > 0) {
            markAllAsRead();
        }
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={handleOpen}
                className={`p-2 cursor-pointer rounded-full transition-all focus:outline-none relative ${
                    isOpen ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Notificaciones de operaciones Cloud"
            >
                <IoMdNotificationsOutline size={24} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-[-60px] sm:right-0 mt-2 w-[calc(100vw-32px)] max-w-[380px] sm:w-96 bg-white border border-gray-300 rounded-sm shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                                Registro de operaciones ({notifications.length})
                            </span>
                            <div className="flex items-center gap-3">
                                {notifications.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={clearNotifications}
                                        className="text-[11px] text-gray-500 hover:text-red-600 flex items-center gap-0.5 cursor-pointer font-medium"
                                        title="Limpiar historial"
                                    >
                                        <MdDeleteSweep size={14} />
                                        <span>Limpiar</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 block w-full">
                            {notifications.length > 0 ? (
                                notifications.map((notif) => (
                                    <div 
                                        key={notif.id} 
                                        className={`p-3.5 flex gap-3 hover:bg-gray-50 transition-colors text-left w-full items-start ${
                                            !notif.read ? 'bg-blue-50/30' : ''
                                        }`}
                                    >
                                        {getIcon(notif.type)}
                                        <div className="flex-1 min-w-0 space-y-0.5">
                                            <div className="flex justify-between items-baseline gap-2">
                                                <p className="text-xs font-medium text-gray-900 truncate">{notif.title}</p>
                                                <span className="text-[10px] text-gray-400 whitespace-nowrap">
                                                    {notif.timestamp ? formatRelativeTime(notif.timestamp) : notif.time}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-gray-500 font-normal leading-normal line-clamp-2">
                                                {notif.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-xs text-gray-400">
                                    No hay notificaciones recientes.
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2.5 text-center">
                            <span className="text-gray-500 text-[11px]">
                                Las operaciones en etiquetas, proyectos y seguridad se registran aquí.
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}