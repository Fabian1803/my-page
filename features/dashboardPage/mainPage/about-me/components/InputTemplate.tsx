import { MdAdd, MdDelete, MdOutlineInfo, MdOutlineLanguage, MdWork, MdSchool } from 'react-icons/md'

interface InputTemplateProps {
    titulo: string
    placeholderUno: string
    placeholderDos: string
    experiencias: {
        id: string
        empresa: string
        cargo: string
        fechaInicio: string
        fechaFin: string
        vinetas: string[]
        urlWeb?: string
        urlMasInfo?: string
    }[]
    agregarExperiencia: () => void
    eliminarExperiencia: (id: string) => void
    actualizarExperiencia: (id: string, campo: 'empresa' | 'cargo' | 'fechaInicio' | 'fechaFin' | 'urlWeb' | 'urlMasInfo', valor: string) => void
    agregarVineta: (id: string) => void
    eliminarVineta: (id: string, vinetaIndex: number) => void
    actualizarVineta: (id: string, vinetaIndex: number, valor: string) => void
    ocultarLinks?: boolean
}

const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const ANIOS = Array.from({ length: 30 }, (_, i) => (2026 - i).toString());

export default function InputTemplate({
    titulo,
    placeholderUno,
    placeholderDos,
    experiencias,
    agregarExperiencia,
    eliminarExperiencia,
    actualizarExperiencia,
    agregarVineta,
    eliminarVineta,
    actualizarVineta,
    ocultarLinks = false
}: InputTemplateProps) {

    const desestructurarFecha = (fechaStr: string) => {
        if (!fechaStr || fechaStr === "Presente") return { mes: "", anio: "" };
        const [mes, anio] = fechaStr.split(" ");
        return { mes: mes || "", anio: anio || "" };
    };

    const isEducation = titulo.toLowerCase().includes('educación');

    return (
        <div className="flex flex-col gap-4 min-w-0 lg:col-span-2 pt-4 border-t border-[#dadce0]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-blue-50 text-[#0c68e0] flex items-center justify-center">
                        {isEducation ? <MdSchool size={18} /> : <MdWork size={18} />}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                            {titulo}
                        </h3>
                        <span className="text-[11px] text-gray-400">
                            {experiencias.length} registro(s) configurado(s)
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={agregarExperiencia}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-100 border border-[#dadce0] text-[#0c68e0] text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer"
                >
                    <MdAdd size={16} />
                    <span>Agregar {isEducation ? 'educación' : 'experiencia'}</span>
                </button>
            </div>

            <div className="space-y-4">
                {experiencias.map((exp, index) => {
                    const fechaInicioParsed = desestructurarFecha(exp.fechaInicio);
                    const fechaFinParsed = desestructurarFecha(exp.fechaFin);
                    const esActualidad = exp.fechaFin === "Presente";

                    return (
                        <div 
                            key={exp.id} 
                            className="border border-[#dadce0] rounded-lg bg-white overflow-hidden shadow-2xs"
                        >
                            {/* Header de la entrada GCP */}
                            <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-4 py-2 flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-700 font-mono">
                                    Recurso #{index + 1}: {exp.empresa || exp.cargo || '(Sin título)'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => eliminarExperiencia(exp.id)}
                                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                    title="Eliminar esta entrada"
                                >
                                    <MdDelete size={17} />
                                </button>
                            </div>

                            <div className="p-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                                            {isEducation ? 'Institución Académica' : 'Empresa / Organización'}
                                        </label>
                                        <input
                                            placeholder={placeholderUno}
                                            value={exp.empresa}
                                            onChange={(e) => actualizarExperiencia(exp.id, 'empresa', e.target.value)}
                                            className="w-full px-3 py-1.5 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-800 focus:outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                                            {isEducation ? 'Título / Grado Académico' : 'Cargo / Rol Desempeñado'}
                                        </label>
                                        <input
                                            placeholder={placeholderDos}
                                            value={exp.cargo}
                                            onChange={(e) => actualizarExperiencia(exp.id, 'cargo', e.target.value)}
                                            className="w-full px-3 py-1.5 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs sm:text-sm text-gray-800 focus:outline-none transition-all"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-semibold text-gray-600">Fecha de Inicio</label>
                                        <div className="flex gap-1.5">
                                            <select
                                                value={fechaInicioParsed.mes}
                                                onChange={(e) => actualizarExperiencia(exp.id, 'fechaInicio', `${e.target.value} ${fechaInicioParsed.anio}`.trim())}
                                                className="w-full px-2.5 py-1.5 border border-[#dadce0] rounded text-xs bg-[#f8f9fa] focus:bg-white focus:border-[#0c68e0] focus:outline-none cursor-pointer"
                                            >
                                                <option value="" disabled>Mes</option>
                                                {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                                            </select>
                                            <select
                                                value={fechaInicioParsed.anio}
                                                onChange={(e) => actualizarExperiencia(exp.id, 'fechaInicio', `${fechaInicioParsed.mes} ${e.target.value}`.trim())}
                                                className="w-full px-2.5 py-1.5 border border-[#dadce0] rounded text-xs bg-[#f8f9fa] focus:bg-white focus:border-[#0c68e0] focus:outline-none cursor-pointer"
                                            >
                                                <option value="" disabled>Año</option>
                                                {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-semibold text-gray-600">Fecha de Fin</label>
                                            <label className="flex items-center gap-1.5 text-xs text-[#0c68e0] font-medium cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={esActualidad}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            actualizarExperiencia(exp.id, 'fechaFin', "Presente");
                                                        } else {
                                                            actualizarExperiencia(exp.id, 'fechaFin', "");
                                                        }
                                                    }}
                                                    className="rounded-xs border-gray-400 text-[#0c68e0] focus:ring-0 h-3.5 w-3.5 cursor-pointer accent-[#0c68e0]"
                                                />
                                                Actualidad
                                            </label>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <select
                                                disabled={esActualidad}
                                                value={esActualidad ? "" : fechaFinParsed.mes}
                                                onChange={(e) => actualizarExperiencia(exp.id, 'fechaFin', `${e.target.value} ${fechaFinParsed.anio}`.trim())}
                                                className="w-full px-2.5 py-1.5 border border-[#dadce0] rounded text-xs bg-[#f8f9fa] focus:bg-white focus:border-[#0c68e0] focus:outline-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                            >
                                                <option value="" disabled>{esActualidad ? "—" : "Mes"}</option>
                                                {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                                            </select>
                                            <select
                                                disabled={esActualidad}
                                                value={esActualidad ? "" : fechaFinParsed.anio}
                                                onChange={(e) => actualizarExperiencia(exp.id, 'fechaFin', `${fechaFinParsed.mes} ${e.target.value}`.trim())}
                                                className="w-full px-2.5 py-1.5 border border-[#dadce0] rounded text-xs bg-[#f8f9fa] focus:bg-white focus:border-[#0c68e0] focus:outline-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                            >
                                                <option value="" disabled>{esActualidad ? "—" : "Año"}</option>
                                                {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {!ocultarLinks && (
                                        <>
                                            <div>
                                                <label className="text-[11px] font-semibold text-gray-600 mb-1 flex items-center gap-1">
                                                    <MdOutlineLanguage className="text-gray-400" size={14} />
                                                    Enlace del sitio web
                                                </label>
                                                <input
                                                    type="url"
                                                    placeholder="https://empresa.com"
                                                    value={exp.urlWeb || ""}
                                                    onChange={(e) => actualizarExperiencia(exp.id, 'urlWeb', e.target.value)}
                                                    className="w-full px-3 py-1.5 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs text-gray-800 focus:outline-none font-mono placeholder:font-sans"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-semibold text-gray-600 mb-1 flex items-center gap-1">
                                                    <MdOutlineInfo className="text-gray-400" size={14} />
                                                    Enlace de más información
                                                </label>
                                                <input
                                                    type="url"
                                                    placeholder="https://github.com/..."
                                                    value={exp.urlMasInfo || ""}
                                                    onChange={(e) => actualizarExperiencia(exp.id, 'urlMasInfo', e.target.value)}
                                                    className="w-full px-3 py-1.5 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs text-gray-800 focus:outline-none font-mono placeholder:font-sans"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Viñetas y Logros */}
                                <div className="space-y-2 pt-2 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-gray-700">
                                            Logros y responsabilidades clave
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => agregarVineta(exp.id)}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0c68e0] hover:underline cursor-pointer"
                                        >
                                            <MdAdd size={14} />
                                            <span>Añadir viñeta</span>
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {exp.vinetas.map((vineta, vIdx) => (
                                            <div key={vIdx} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#0c68e0] shrink-0"></span>
                                                <input
                                                    value={vineta}
                                                    onChange={(e) => actualizarVineta(exp.id, vIdx, e.target.value)}
                                                    placeholder="Describe una tarea, tecnología o logro relevante..."
                                                    className="flex-1 px-3 py-1.5 bg-[#f8f9fa] hover:bg-white focus:bg-white border border-[#dadce0] focus:border-[#0c68e0] rounded text-xs text-gray-800 focus:outline-none transition-all"
                                                />
                                                {exp.vinetas.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => eliminarVineta(exp.id, vIdx)}
                                                        className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                                                        title="Eliminar viñeta"
                                                    >
                                                        <MdDelete size={15} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {experiencias.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-[#dadce0] rounded-lg text-xs sm:text-sm text-gray-500 bg-[#f8f9fa] flex flex-col items-center justify-center gap-2">
                        <p className="font-medium text-gray-700">No hay registros añadidos</p>
                        <button
                            type="button"
                            onClick={agregarExperiencia}
                            className="text-xs font-semibold text-[#0c68e0] hover:underline cursor-pointer"
                        >
                            + Agregar primera entrada de {isEducation ? 'educación' : 'experiencia'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}