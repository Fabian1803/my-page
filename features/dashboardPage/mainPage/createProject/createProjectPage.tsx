'use client'
import DashboardLinksForm from './components/dashboardLinksForm'
import DashboardThumbnailForm from './components/dashboardThumbnailForm'
import DashboardBlocksForm from './components/DashboardBlocksForm/dashboardBlocksForm'
import { useCreateProject } from './hooks/useCreateProject'
export default function CreateProjectPage() {
    const {
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        dynamicLinks,
        contentBlocks,
        setThumbnailFile,
        handleAddLink,
        handleUrlChange,
        handleRemoveLink,
        handleAddBlock,
        handleBlockChange,
        handleRemoveBlock,
        handleSubmit
    } = useCreateProject()

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-[24px] font-normal tracking-tight text-[#202124]">Registrar nuevo proyecto</h1>
                <p className="text-sm text-[#5f6368] mt-1">Configura los despliegues, repositorios y documentación de forma dinámica.</p>
            </div>
            <div className="bg-white border-[#dadce0] p-6 md:p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-[#3c4043] mb-2">Nombre del proyecto *</label>
                        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Ej. Corelia IA" className="w-full px-4 py-2.5 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] transition-all text-[#202124]" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="descripcion" className="block text-sm font-medium text-[#3c4043]">Descripción corta *</label>
                            <span className="text-xs text-[#5f6368]">{descripcion.length}/150</span>
                        </div>
                        <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value.slice(0, 150))} required rows={3} placeholder="Resume el propósito del proyecto..." className="w-full px-4 py-2.5 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0] transition-all text-[#202124] resize-none" />
                    </div>
                    <DashboardThumbnailForm onFileSelect={setThumbnailFile} />
                    <DashboardLinksForm 
                        dynamicLinks={dynamicLinks}
                        onAddLink={handleAddLink}
                        onUrlChange={handleUrlChange}
                        onRemoveLink={handleRemoveLink}
                    />
                    <DashboardBlocksForm 
                        contentBlocks={contentBlocks}
                        onAddBlock={handleAddBlock}
                        onBlockChange={handleBlockChange}
                        onRemoveBlock={handleRemoveBlock}
                    />
                    <div className="flex justify-end gap-2 pt-4 border-t border-[#dadce0]">
                        <button type="button" className="px-5 py-2 text-sm font-medium text-[#0b57d0] hover:bg-blue-50/50 rounded-full transition-colors">Descartar</button>
                        <button type="submit" className="px-6 py-2 bg-[#0b57d0] hover:bg-[#155bd3] text-white text-sm font-semibold rounded-full transition-all shadow-sm">Guardar cambios</button>
                    </div>
                </form>
            </div>
        </div>
    )
}