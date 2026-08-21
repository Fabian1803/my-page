interface InputAboutMeProps {
    title: string
    nombre: string
    setNombre: (nombre: string) => void
}

export default function InputAboutMe({ title, nombre, setNombre }: InputAboutMeProps) {
    return (
        <div className="flex flex-col gap-1.5 min-w-0">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c68e0]"></span>
                {title}
            </label>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre completo..."
                className="w-full px-3.5 py-2 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-900 focus:outline-none transition-all"
            />
            <span className="text-[11px] text-gray-400">
                Se mostrará como título principal y nombre de identidad en el portafolio.
            </span>
        </div>
    )
}
