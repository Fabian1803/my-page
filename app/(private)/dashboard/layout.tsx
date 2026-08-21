'use client'
import React, { useState } from 'react'
import DashboardHeaderPage from '@/features/dashboardPage/dashboardHeaderPage'
import DashboardAsidePage from '@/features/dashboardPage/dashboardAsidePage'
import { useSessionHeartbeat } from '@/features/dashboardPage/hooks/useSessionHeartbeat'
import { NotificationProvider } from '@/features/dashboardPage/context/NotificationContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    useSessionHeartbeat()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <NotificationProvider>
            <div className="min-h-screen bg-[#f0f4f9] text-[#202124] antialiased flex flex-col md:flex-row">
                <DashboardHeaderPage onOpenMenu={setIsMenuOpen} />
                <DashboardAsidePage isMenuOpen={isMenuOpen} onOpenMenu={setIsMenuOpen} />
                {isMenuOpen && (
                    <div
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 z-40"
                    />
                )}

                <main className="flex-1 mt-14 px-2 sm:px-5">
                    {children}
                </main>
            </div>
        </NotificationProvider>
    )
}