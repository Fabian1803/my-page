'use client'
import React from 'react'
import { useSocialLinks } from './hooks'
import {
    SocialLinksHeaderBar,
    SocialLinksGrid,
    SocialLinksActionBar
} from './components'

export default function SocialLinksPage() {
    const {
        socialLinks,
        loading,
        loadingInitial,
        handleInputChange,
        handleSubmit,
        handleReset
    } = useSocialLinks()

    return (
        <div className="max-w-[1600px] mx-auto flex flex-col h-full gap-1 bg-[#f9fafb] rounded-t-2xl min-h-[85vh]">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <SocialLinksHeaderBar />
                <SocialLinksGrid
                    socialLinks={socialLinks}
                    onInputChange={handleInputChange}
                />
                <SocialLinksActionBar
                    loading={loading}
                    onReset={handleReset}
                />
            </form>
        </div>
    )
}