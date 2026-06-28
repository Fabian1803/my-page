interface TextareaAboutMeProps {
    title: string
    nombre: string
    setNombre: (nombre: string) => void
}
export default function TextareaAboutMe({ title, nombre, setNombre }: TextareaAboutMeProps) {
    return (
        <div className="flex flex-col gap-2 min-w-0 col-span-1 lg:col-span-2">
            <label className="text-sm font-medium text-[#3c4043]">
                {title}
            </label>
            <div className="flex items-center gap-3 w-full">
                <textarea
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="flex-1 min-w-0 px-4 py-2.5 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] text-[#202124] transition-all"
                />
            </div>
        </div>
    )
}
