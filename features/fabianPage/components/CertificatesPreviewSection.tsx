import Link from 'next/link'
import { FiMoreVertical, FiChevronDown } from 'react-icons/fi'

interface CertificateItem {
  id: string;
  titulo?: string;
  nombre?: string;
  universidad?: string;
  instituto?: string;
  imagenCertificado?: string;
  imagenPrincipalUrl?: string;
  imagenLogo?: string;
  miniaturaUrl?: string;
}

interface CertificatesPreviewSectionProps {
  certificates: CertificateItem[];
}

export default function CertificatesPreviewSection({ certificates }: CertificatesPreviewSectionProps) {
  if (!certificates || certificates.length === 0) return null;
  const displayCerts = certificates.slice(0, 3);

  return (
    <div className="py-4 px-4 max-w-200 flex flex-col gap-3">
      <h2 className="text-xl sm:text-2xl font-normal text-gray-900">
        Certificados
      </h2>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {displayCerts.map((cert) => {
          const src = cert.imagenCertificado || cert.imagenPrincipalUrl;
          const title = cert.titulo || cert.nombre || "Certificado";
          const logo = cert.imagenLogo || cert.miniaturaUrl || '/log.webp';
          const institution = cert.universidad || cert.instituto || 'Certificación';

          if (!src) return null;
          return (
            <Link
              key={cert.id}
              href="/fabianrivera/certificados"
              className="group flex flex-col min-w-0"
            >
              <div className="w-full aspect-[4/3] rounded-2xl bg-gray-100/80 overflow-hidden flex items-center justify-center border border-gray-200/60 shadow-2xs group-hover:shadow-md transition-all duration-200">
                <img
                  src={src}
                  alt={title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate mt-2 leading-tight">
                {title}
              </p>

              <div className="flex items-center justify-between mt-1 text-gray-600">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full overflow-hidden bg-white shrink-0 flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[11px] sm:text-xs text-gray-600 truncate">{institution}</span>
                </div>
                <span className="text-gray-400 hover:text-gray-600 shrink-0 ml-1">
                  <FiMoreVertical size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="relative flex items-center justify-center my-4 border-t border-gray-200">
        <Link
          href="/fabianrivera/certificados"
          className="absolute bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium text-xs sm:text-sm py-2 px-6 rounded-full transition-colors flex items-center gap-2 shadow-2xs"
        >
          <span>Mostrar más certificados</span>
          <FiChevronDown size={16} className="text-gray-600" />
        </Link>
      </div>
    </div>
  );
}
