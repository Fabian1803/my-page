This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

columns-1
mb-4 break-inside-avoid







import Image from 'next/image'
import React from 'react'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4">
            <div className="bg-white border border-[#dadce0] rounded-2xl p-12 w-full max-w-4xl shadow-sm flex items-start gap-16">
                
                {/* Lado izquierdo */}
                <div className="w-1/2 pt-2">
                    <div className="mb-6">
                        <Image src="/Flog.webp" alt="Logo" width={40} height={40} />
                    </div>
                    <h1 className="text-[32px] text-[#202124] mb-2 font-normal">Inicia sesión</h1>
                    <p className="text-[18px] text-[#202124]">Utiliza tu cuenta de Google</p>
                </div>

                {/* Lado derecho con efecto flotante */}
                <div className="w-1/2 mt-2">
                    <div className="relative mb-6">
                        <input
                            type="email"
                            id="email"
                            className="peer w-full px-3 py-4 border border-[#747775] rounded-[4px] focus:outline-none focus:border-2 focus:border-[#0b57d0] transition-all placeholder-transparent"
                            placeholder="Correo electrónico o teléfono"
                        />
                        <label 
                            htmlFor="email"
                            className="absolute left-3 -top-2.5 px-1 bg-white text-[#747775] text-[16px] transition-all 
                            peer-placeholder-shown:top-4 peer-placeholder-shown:text-[#747775] 
                            peer-focus:-top-2.5 peer-focus:text-[#0b57d0] peer-focus:text-[12px]"
                        >
                            Correo electrónico o teléfono
                        </label>
                    </div>

                    <p className="text-[#0b57d0] font-medium text-[14px] mb-8 cursor-pointer hover:underline">
                        ¿Has olvidado tu correo electrónico?
                    </p>

                    <p className="text-[14px] text-[#444746] mb-10">
                        ¿No es tu ordenador? Usa el modo Invitado para iniciar sesión de forma privada. 
                        <span className="text-[#0b57d0] font-medium cursor-pointer ml-1 hover:underline">Más información</span>
                    </p>

                    <div className="flex justify-end items-center gap-4">
                        <span className="text-[#0b57d0] font-medium text-[14px] cursor-pointer hover:underline">Crear cuenta</span>
                        <button className="bg-[#0b57d0] text-white px-6 py-2.5 rounded-full font-medium text-[14px] hover:bg-[#155bd3]">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
