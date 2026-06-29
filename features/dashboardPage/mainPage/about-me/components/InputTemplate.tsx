import { MdAdd, MdDeleteOutline, MdOutlineInfo, MdOutlineLanguage } from 'react-icons/md'

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

export default function InputTemplate({ titulo, placeholderUno, placeholderDos, experiencias, agregarExperiencia, eliminarExperiencia, actualizarExperiencia, agregarVineta, eliminarVineta, actualizarVineta, ocultarLinks = false }: InputTemplateProps) {

    const desestructurarFecha = (fechaStr: string) => {
        if (!fechaStr || fechaStr === "Presente") return { mes: "", anio: "" };
        const [mes, anio] = fechaStr.split(" ");
        return { mes: mes || "", anio: anio || "" };
    };

    return (
        <div className="flex flex-col gap-4 min-w-0 lg:col-span-2 pt-2">
            <div className="flex items-center justify-between">
                <label className="text-lg font-medium text-[#3c4043]">
                    {titulo}
                </label>
                <button
                    type="button"
                    onClick={agregarExperiencia}
                    className="inline-flex items-center gap-1 px-4 py-1.5 border border-[#747775] hover:bg-[#f8f9fa] text-[#0b57d0] text-sm font-medium rounded-xl transition-all shadow-sm"
                >
                    <MdAdd className="h-4 w-4" />
                    Agregar {titulo.toLowerCase() === 'educación' ? 'educación' : 'experiencia'}
                </button>
            </div>

            <div className="space-y-6">
                {experiencias.map((exp, index) => {
                    const fechaInicioParsed = desestructurarFecha(exp.fechaInicio);
                    const fechaFinParsed = desestructurarFecha(exp.fechaFin);
                    const esActualidad = exp.fechaFin === "Presente";

                    return (
                        <div key={exp.id} className="pt-4 border-t border-[#dadce0] relative space-y-4">
                            <div className="flex items-center justify-between pr-10">
                                <span className="text-xs font-semibold text-[#5f6368]">
                                    Entrada #{index + 1}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => eliminarExperiencia(exp.id)}
                                    className="absolute top-3 right-0 p-1.5 text-[#5f6368] hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                                    title="Eliminar este bloque"
                                >
                                    <MdDeleteOutline className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    placeholder={placeholderUno}
                                    value={exp.empresa}
                                    onChange={(e) => actualizarExperiencia(exp.id, 'empresa', e.target.value)}
                                    className="w-full px-4 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]"
                                />
                                <input
                                    placeholder={placeholderDos}
                                    value={exp.cargo}
                                    onChange={(e) => actualizarExperiencia(exp.id, 'cargo', e.target.value)}
                                    className="w-full px-4 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]"
                                />

                                {/* Control: Fecha de Inicio */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-[#5f6368] pl-1">Fecha de inicio</label>
                                    <div className="flex">
                                        <select
                                            value={fechaInicioParsed.mes}
                                            onChange={(e) => actualizarExperiencia(exp.id, 'fechaInicio', `${e.target.value} ${fechaInicioParsed.anio}`.trim())}
                                            className="w-full px-3 py-2 border border-[#747775] rounded-l-xl text-sm bg-white focus:outline-none focus:border-2 focus:border-[#0b57d0] cursor-pointer"
                                        >
                                            <option value="" disabled>Mes</option>
                                            {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                        <select
                                            value={fechaInicioParsed.anio}
                                            onChange={(e) => actualizarExperiencia(exp.id, 'fechaInicio', `${fechaInicioParsed.mes} ${e.target.value}`.trim())}
                                            className="w-full px-3 py-2 border border-[#747775] rounded-r-xl text-sm bg-white focus:outline-none focus:border-2 focus:border-[#0b57d0] cursor-pointer"
                                        >
                                            <option value="" disabled>Año</option>
                                            {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between pl-1">
                                        <label className="text-xs text-[#5f6368]">Fecha de fin</label>
                                        <label className="flex items-center gap-1.5 text-xs text-[#0b57d0] font-medium cursor-pointer select-none">
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
                                                className="rounded border-[#747775] text-[#0b57d0] focus:ring-[#0b57d0] h-3.5 w-3.5 cursor-pointer"
                                            />
                                            Actualidad
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <select
                                            disabled={esActualidad}
                                            value={esActualidad ? "" : fechaFinParsed.mes}
                                            onChange={(e) => actualizarExperiencia(exp.id, 'fechaFin', `${e.target.value} ${fechaFinParsed.anio}`.trim())}
                                            className="w-full px-3 py-2 border border-[#747775] rounded-l-xl text-sm bg-white focus:outline-none focus:border-2 focus:border-[#0b57d0] cursor-pointer disabled:bg-[#f1f3f4] disabled:text-[#5f6368] disabled:border-[#dadce0] disabled:cursor-not-allowed"
                                        >
                                            <option value="" disabled>{esActualidad ? "—" : "Mes"}</option>
                                            {MESES.map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                        <select
                                            disabled={esActualidad}
                                            value={esActualidad ? "" : fechaFinParsed.anio}
                                            onChange={(e) => actualizarExperiencia(exp.id, 'fechaFin', `${fechaFinParsed.mes} ${e.target.value}`.trim())}
                                            className="w-full px-3 py-2 border border-[#747775] rounded-r-xl text-sm bg-white focus:outline-none focus:border-2 focus:border-[#0b57d0] cursor-pointer disabled:bg-[#f1f3f4] disabled:text-[#5f6368] disabled:border-[#dadce0] disabled:cursor-not-allowed"
                                        >
                                            <option value="" disabled>{esActualidad ? "—" : "Año"}</option>
                                            {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
                                        </select>
                                    </div>
                                </div>
                                {!ocultarLinks && (
                                    <>
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-xs text-[#5f6368] pl-1 flex items-center gap-1">
                                                <MdOutlineLanguage className="h-3.5 w-3.5 text-[#747775]" />
                                                Enlace del sitio web
                                            </label>
                                            <input
                                                type="url"
                                                placeholder="https://mi-despliegue.com"
                                                value={exp.urlWeb || ""}
                                                onChange={(e) => actualizarExperiencia(exp.id, 'urlWeb', e.target.value)}
                                                className="w-full px-4 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-xs text-[#5f6368] pl-1 flex items-center gap-1">
                                                <MdOutlineInfo className="h-3.5 w-3.5 text-[#747775]" />
                                                Más información
                                            </label>
                                            <input
                                                type="url"
                                                placeholder="https://github.com/usuario/repo"
                                                value={exp.urlMasInfo || ""}
                                                onChange={(e) => actualizarExperiencia(exp.id, 'urlMasInfo', e.target.value)}
                                                className="w-full px-4 py-2 border border-[#747775] rounded-xl text-sm focus:outline-none focus:border-2 focus:border-[#0b57d0]"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="space-y-3 pl-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-medium text-[#3c4043]">
                                        Descripciones / Viñetas
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => agregarVineta(exp.id)}
                                        className="inline-flex items-center gap-0.5 text-xs font-medium text-[#0b57d0] hover:underline"
                                    >
                                        <MdAdd className="h-3.5 w-3.5" />
                                        Agregar viñeta
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {exp.vinetas.map((vineta, vIdx) => (
                                        <div key={vIdx} className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-[#747775] flex-shrink-0" />
                                            <input
                                                value={vineta}
                                                onChange={(e) => actualizarVineta(exp.id, vIdx, e.target.value)}
                                                placeholder="Añade un hito o logro relevante..."
                                                className="flex-1 px-4 py-1.5 border border-[#dadce0] rounded-lg text-xs focus:outline-none focus:border-[#0b57d0]"
                                            />
                                            {exp.vinetas.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarVineta(exp.id, vIdx)}
                                                    className="p-1 text-[#5f6368] hover:text-red-500 rounded-lg transition-colors"
                                                >
                                                    <MdDeleteOutline className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {experiencias.length === 0 && (
                    <div className="text-center py-6 border border-dashed border-[#dadce0] text-sm text-[#5f6368]">
                        No has añadido ninguna entrada laboral o académica aún.
                    </div>
                )}
            </div>
        </div>
    )
}