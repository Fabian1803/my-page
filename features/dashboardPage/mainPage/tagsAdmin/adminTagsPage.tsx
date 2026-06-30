'use client'
import { MdLocalOffer, MdCloudUpload, MdDelete, MdStar, MdStarBorder } from 'react-icons/md'
import { useTagsAdmin } from './hooks/useTagsAdmin'

export default function AdminTagsPage() {
   const { 
       tags, nombre, setEsDestacado, esDestacado, previewImage, 
       fileInputRef, loading, handleNombreChange, handleImageChange, 
       handleSaveTag, handleDeleteTag, handleToggleDestacado 
   } = useTagsAdmin()

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6 text-black bg-white min-h-screen">
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <MdLocalOffer className="text-[#0b57d0]" />
                    Gestión de Tecnologías y Etiquetas
                </h1>
                <p className="text-sm text-gray-500">
                    Crea etiquetas personalizadas, asigna sus logotipos oficiales y destácalas en tu portafolio público.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Formulario */}
                <form onSubmit={handleSaveTag} className="bg-[#f8f9fa] border border-[#dadce0] p-5 rounded-2xl space-y-4">
                    <h2 className="text-sm font-bold text-gray-700">Nueva Tecnología</h2>
                    
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600">Nombre de la Tecnología</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={handleNombreChange}
                            placeholder="Ej: Kong, Java 17, Next.js"
                            className="w-full px-3 py-2 bg-white border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600">Logotipo / Icono</label>
                        <div 
                            onClick={() => !loading && fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors bg-white h-28 overflow-hidden"
                        >
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="h-full object-contain" />
                            ) : (
                                <>
                                    <MdCloudUpload size={24} className="text-gray-400" />
                                    <span className="text-xs text-gray-500 font-medium">Subir PNG, SVG o JPEG</span>
                                </>
                            )}
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            accept="image/*" 
                            className="hidden" 
                        />
                    </div>

                    <div className="flex items-center justify-between py-2 bg-white px-3 rounded-xl border border-gray-200">
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-700">Destacar Tecnología</span>
                            <span className="text-[10px] text-gray-400">Mostrar en la cuadrícula principal</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setEsDestacado(!esDestacado)}
                            disabled={loading}
                            className={`p-1.5 rounded-lg transition-colors ${esDestacado ? 'text-yellow-500' : 'text-gray-400'}`}
                        >
                            {esDestacado ? <MdStar size={24} /> : <MdStarBorder size={24} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-[#0b57d0] hover:bg-[#0a4ebc] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors disabled:opacity-50"
                    >
                        {loading ? "Guardando..." : "Guardar Tecnología"}
                    </button>
                </form>

                {/* Grid de Tecnologías Registradas */}
                <div className="lg:col-span-2 space-y-3">
                    <h2 className="text-sm font-bold text-gray-700 px-1">Tecnologías Registradas ({tags.length})</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tags.map((tag) => (
                            <div 
                                key={tag.id} 
                                className="flex items-center justify-between p-3 bg-white border border-[#dadce0] rounded-xl hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-100 p-1.5 flex items-center justify-center shrink-0">
                                        <img src={tag.imagenUrl} alt={tag.nombre} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold text-gray-900 truncate">{tag.nombre}</h3>
                                        {/* Mostramos la ID reducida en lugar de slug para verificar visualmente que viene de Postgres */}
                                        <p className="text-[10px] text-gray-400 font-mono truncate">{tag.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleToggleDestacado(tag.id)}
                                        className={`p-1.5 rounded-lg hover:bg-gray-100 ${tag.destacado ? 'text-yellow-500' : 'text-gray-300'}`}
                                        title={tag.destacado ? "Destacada" : "Marcar como destacada"}
                                    >
                                        {tag.destacado ? <MdStar size={20} /> : <MdStarBorder size={20} />}
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteTag(tag.id, tag.nombre)}
                                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                                        title="Eliminar"
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}