'use client'
import React, { useState } from 'react'
import DashboardHeaderPage from '@/features/dashboardPage/dashboardHeaderPage'
import DashboardAsidePage from '@/features/dashboardPage/dashboardAsidePage'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-[#f0f4f9] text-[#202124] antialiased flex flex-col md:flex-row">

            <DashboardHeaderPage onOpenMenu={setIsMenuOpen} />

            <DashboardAsidePage isMenuOpen={isMenuOpen} />

            {isMenuOpen && (
                <div
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-[1px]"
                />
            )}

            <main className="flex-1 p-4 md:p-6 pt-24 md:pt-10">
                <div className="w-full max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

        </div>
    )
}