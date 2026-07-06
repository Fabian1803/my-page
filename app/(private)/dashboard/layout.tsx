'use client'
import React, { useState } from 'react'
import DashboardHeaderPage from '@/features/dashboardPage/dashboardHeaderPage'
import DashboardAsidePage from '@/features/dashboardPage/dashboardAsidePage'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-[#f0f4f9] text-[#202124] antialiased flex flex-col md:flex-row">
            <DashboardHeaderPage onOpenMenu={setIsMenuOpen} />
            <DashboardAsidePage isMenuOpen={isMenuOpen} onOpenMenu={setIsMenuOpen} />
            {isMenuOpen && (
                <div
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40"
                />
            )}

            <main className="flex-1 mt-14">
                <div className="w-full max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

        </div>
    )
}