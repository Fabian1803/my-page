'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CloudNotification {
    id: string;
    type: 'success' | 'info' | 'error';
    title: string;
    desc: string;
    time: string;
    read: boolean;
    timestamp: number;
}

interface NotificationContextType {
    notifications: CloudNotification[];
    unreadCount: number;
    addNotification: (notif: { type: 'success' | 'info' | 'error'; title: string; desc: string }) => void;
    markAllAsRead: () => void;
    clearNotifications: () => void;
}
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
const INITIAL_NOTIFICATIONS: CloudNotification[] = [
    {
        id: 'init-1',
        type: 'success',
        title: 'Sistema Cloud inicializado',
        desc: 'Conexión activa con Postgres y Vercel Blob Storage.',
        time: 'Reciente',
        read: false,
        timestamp: Date.now()
    }
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<CloudNotification[]>(INITIAL_NOTIFICATIONS);
    useEffect(() => {
        try {
            const saved = localStorage.getItem('gcp_cloud_notifications');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setNotifications(parsed);
                }
            }
        } catch (e) {
            console.error('Error al cargar notificaciones:', e);
        }
    }, []);

    const persistNotifications = (newNotifs: CloudNotification[]) => {
        setNotifications(newNotifs);
        try {
            localStorage.setItem('gcp_cloud_notifications', JSON.stringify(newNotifs));
        } catch (e) {
            console.error('Error al guardar notificaciones:', e);
        }
    };

    const addNotification = ({ type, title, desc }: { type: 'success' | 'info' | 'error'; title: string; desc: string }) => {
        const newNotif: CloudNotification = {
            id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            type,
            title,
            desc,
            time: 'Ahora mismo',
            read: false,
            timestamp: Date.now()
        };
        const updated = [newNotif, ...notifications.slice(0, 19)];
        persistNotifications(updated);
    };

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        persistNotifications(updated);
    };
    const clearNotifications = () => {
        persistNotifications([]);
    };
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotification,
                markAllAsRead,
                clearNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications debe ser usado dentro de un NotificationProvider');
    return context;
}
