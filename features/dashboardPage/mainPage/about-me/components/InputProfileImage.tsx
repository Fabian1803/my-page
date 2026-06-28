import { MdUploadFile } from 'react-icons/md'

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
        return "Ningún archivo seleccionado";
    };

    return (
        <div className="flex flex-col gap-2 min-w-0 w-full">
            <label className="text-sm font-medium text-[#3c4043]">
                foto de perfil
            </label>
            <div className="flex items-center gap-3 w-full min-w-0">
                <div className="flex-1 flex items-center justify-between px-4 py-2 border border-[#747775] rounded-xl text-sm text-[#5f6368] bg-white h-[42px] min-w-0">
                    <span className="truncate w-full pr-2 select-none">
                        {obtenerNombreArchivo()}
                    </span>
                    {previewUrl && (
                        <img src={previewUrl} alt="Preview" className="h-6 w-6 object-cover rounded-md border border-[#dadce0] flex-shrink-0" />
                    )}
                </div>
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 border border-[#747775] text-[#0b57d0] hover:bg-blue-50/50 text-sm font-medium rounded-xl transition-colors whitespace-nowrap flex-shrink-0">
                    <MdUploadFile className="h-4 w-4" />
                    Buscar
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFotoChange}
                    />
                </label>
            </div>
        </div>
    )
}