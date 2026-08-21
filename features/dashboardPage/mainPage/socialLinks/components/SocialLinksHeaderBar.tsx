import React from 'react'
import { MdShare, MdSave } from 'react-icons/md'
import { BiDislike, BiLike } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoReload } from 'react-icons/io5'

export default function SocialLinksHeaderBar() {
    return (
        <div className="border-b border-[#dbdce0] px-4 sm:px-6 py-3.5 bg-white rounded-t-2xl">
            <h1 className="text-base sm:text-lg font-medium text-gray-800">
                Enlaces y Redes Sociales
            </h1>
        </div>
    )
}
