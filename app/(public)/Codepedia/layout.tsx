'use client'
import React from 'react'
import { CodePediaHeader, CodePediaFooter, CodePediaSection } from '@/features/codePediaPage/components'
import { CodePediaProvider } from "@/features/codePediaPage/context/CodePediaContext"

export default function CodepediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <CodePediaProvider>
      <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-[#101418] dark:text-gray-100 transition-colors duration-300">
        <CodePediaHeader />
        <main className="flex px-4 lg:px-10 w-full">
          <div className="w-full">
            {children}
          </div>
          
          <div className="hidden w-65 lg:flex">
            <CodePediaSection />
          </div>
        </main>
        <CodePediaFooter />
      </div>
    </CodePediaProvider>
  )
}