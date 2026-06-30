import Link from "next/link"
interface PropsP {
    blod?: boolean
    children?: React.ReactNode
    className?: string
}

function P({ blod, children, className }: PropsP) {
    return (
        <p className={`text-[14px] ${blod ? "font-bold text-gray-800" : "text-gray-700"} ${className}`}>
            {children}
        </p>
    )
}

export default function FabianPageFooter() {
    const ListSocialMedia = [
        { name: "Facebook", href: "https://facebook.com", icon: "Github" },
        { name: "Twitter", href: "https://twitter.com", icon: "Linkedin" },
        { name: "Instagram", href: "https://instagram.com", icon: "Discord" },
        { name: "LinkedIn", href: "https://linkedin.com", icon: "Gmail" },
    ]
    return (
        <footer className="bg-gray-200 h-37 max-[1461]:justify-center min-[1461]:pl-34 flex">
            <div className="grid grid-rows-[30%_70%] p-5 w-[1160px] 
            max-[1461px]:w-[1160px]
        max-[1164px]:w-[860px]
        max-[940px]:w-full">
                <div className="">
                    <P className="line-clamp-2 md:line-clamp-3">Desarrollado con Next.js, Next api, desplegado en Vercel, utilizando Tailwind CSS, PostgreSQL, Blob y Prisma.</P>
                </div>
                <div className="grid grid-cols-[40px_auto] items-center">
                    <P>Peru</P>
                    <div className="flex gap-2 items-center border-l pl-2 border-gray-400">
                        <P blod={true} className="items-center flex gap-2"><span className="text-3xl">•</span> {new Date().getFullYear()} Lima</P>
                        <P> - Fabian rivera</P>
                    </div>
                    <div className="flex gap-4 border-t border-gray-400 col-span-2 pl-4 py-2">
                        {ListSocialMedia.map((social) => (
                            <Link key={social.name} href={social.href}>
                                <P>{social.icon}</P>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
