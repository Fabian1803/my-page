import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import InputSearch from '@/components/InputSearch'

export default function SearchMainPage() {
  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col gap-8 w-[500px] max-w-[500px] max-[600px]:w-full max-[600px]:max-w-full max-[600px]:px-[3%]">
        
        <div className="flex justify-center text-[100px]">
          <Image 
            src="/log.png" 
            alt="GoogleIcon" 
            height={100} 
            width={270} 
            className="h-[100px] w-auto max-[450px]:h-[80px]" 
            priority 
          />
        </div>
        <InputSearch type="SearchPageInputType" placeholder="" />

        {/* Botones */}
        <div className="flex justify-center gap-3 text-black">
          <Link 
            href="/Fabian-Rivera" 
            className="bg-gray-500/10 no-underline py-[5px] px-3 rounded-[5px] border border-transparent hover:border-gray-500/30 transition-colors"
          >
            Buscar en Google
          </Link>
          <Link 
            href="/Fabian-Rivera" 
            className="bg-gray-500/10 no-underline py-[5px] px-3 rounded-[5px] border border-transparent hover:border-gray-500/30 transition-colors"
          >
            Voy a tener suerte
          </Link>
        </div>

        <p className="text-center text-[16px] max-[450px]:text-[14px]">
          Google disponible en: <span className="text-blue-600 cursor-pointer hover:underline">Español (Latinoamérica)</span>
        </p>
      </div>
    </main>
  )
}