import { MdCloudUpload, MdImage } from 'react-icons/md'

interface InputProfileImageProps {
    fotoPerfil: File | null
    setFotoPerfil: (file: File | null) => void
    previewUrl: string | null
    setPreviewUrl: (url: string | null) => void
    handleFotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputProfileImage({ fotoPerfil, previewUrl, handleFotoChange }: InputProfileImageProps) {
    const obtenerNombreArchivo = () => {
        if (fotoPerfil) return fotoPerfil.name;
        if (previewUrl) {
            const partes = previewUrl.split('/');
            const nombreConTimestamp = partes[partes.length - 1];
            const indiceGuion = nombreConTimestamp.indexOf('-');
            return indiceGuion !== -1 ? nombreConTimestamp.substring(indiceGuion + 1) : nombreConTimestamp;
        }
        return "Ninguna imagen seleccionada";
    };

    return (
        <div className="flex flex-col gap-1.5 min-w-0 w-full">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c68e0]"></span>
                Fotografía de Perfil (Cloud Asset)
            </label>
            
            <div className="flex items-center gap-3 w-full min-w-0">
                <div className="flex-1 flex items-center justify-between px-3.5 py-1.5 bg-[#f8f9fa] border border-[#dadce0] rounded text-xs sm:text-sm text-gray-700 h-[40px] min-w-0">
                    <span className="truncate w-full pr-2 select-none font-mono text-xs">
                        {obtenerNombreArchivo()}
                    </span>
                    {previewUrl ? (
                        <img 
                            src={previewUrl} 
                            alt="Avatar Preview" 
                            className="h-6 w-6 object-cover rounded-full border border-[#dadce0] flex-shrink-0" 
                        />
                    ) : (
                        <MdImage size={18} className="text-gray-400 shrink-0" />
                    )}
                </div>

                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#f8f9fa] hover:bg-gray-200 border border-[#dadce0] text-[#0c68e0] hover:text-blue-700 text-xs sm:text-sm font-medium rounded transition-colors whitespace-nowrap flex-shrink-0 shadow-2xs">
                    <MdCloudUpload size={16} />
                    <span>Examinar</span>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFotoChange}
                    />
                </label>
            </div>
            
            <span className="text-[11px] text-gray-400">
                Formato recomendado: PNG, WEBP o JPG cuadrado (Mín. 400x400 px).
            </span>
        </div>
    )
}