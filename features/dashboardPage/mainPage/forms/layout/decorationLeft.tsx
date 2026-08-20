import { FaCircle } from 'react-icons/fa';
interface DecorationLeftProps {
    activeField: string;
    title: string;
}
export default function DecorationLeft({ activeField, title }: DecorationLeftProps) {
    const listCertificado = [
        { nombre: 'Nombre del certificado', descripcion: "e1 medium, us-central1" },
        { nombre: 'Descripción', descripcion: 'Debian GNU Linux 11 (bullseye)' },
        { nombre: 'Imagen', descripcion: 'Snapshot schedules' },
        { nombre: 'Instituto', descripcion: '1 Network instance' },
        { nombre: 'Categoría', descripcion: 'Instance template' },
        { nombre: 'Viñetas', descripcion: 'Ops Agent' },
    ];

    const listProyecto = [
        { nombre: 'Nombre del proyecto', descripcion: 'e2-standard-2, us-central1-a' },
        { nombre: 'Descripción', descripcion: 'Object Storage Bucket Metadata' },
        { nombre: 'Categoría', descripcion: 'VPC Network Target Tags' },
        { nombre: 'Viñetas', descripcion: 'Artifact Registry Repositories' },
        { nombre: 'Imagen', descripcion: 'Boot Disk SSD Snapshot' },
        { nombre: 'Enlaces', descripcion: 'External HTTP(S) Load Balancer' },
        { nombre: 'Documentación', descripcion: 'Cloud Run Service Revision' },
    ];

    const listEtiqueta = [
        { nombre: 'Nombre de la tecnología', descripcion: 'Identificador global de recurso' },
        { nombre: 'Logotipo Oficial', descripcion: 'Cloud Storage SVG/PNG Asset' },
        { nombre: 'Visibilidad y Estado', descripcion: 'Destacado en cuadrícula principal' },
    ];

    const currentList = title === 'proyecto' 
        ? listProyecto 
        : (title === 'etiqueta' || title === 'tecnología') 
            ? listEtiqueta 
            : listCertificado;
    return (
        <div className="pt-4 space-y-1 hidden xl:block">
            {currentList.map((item, index) => {
                const isCurrentActive = activeField === item.nombre;
                return (
                    <div key={index} className={`grid grid-cols-[30px_auto] items-center pl-4 py-4 ${isCurrentActive ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}>
                        <div className="flex items-start justify-start h-full pt-1.5">
                            <FaCircle
                                size={10}
                                className={`transition-colors duration-200 ${isCurrentActive ? 'text-[#3367d6]' : 'text-gray-300'
                                    }`}
                            />
                        </div>
                        <div>
                            <p className={`text-md font-medium transition-colors duration-200 itext-gray-700'
                            }`}>{item.nombre}</p>
                            <p className="text-[11px] text-gray-400 font-normal">{item.descripcion}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}