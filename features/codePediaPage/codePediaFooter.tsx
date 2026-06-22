import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
export default function codePediaFooter() {
    const footerItems = [
        'Política de privacidad',
        'Acerca de Wikipedia',
        'Limitación de responsabilidad',
        'Contacto legal y de seguridad',
        'Código de conducta',
        'Desarrolladores',
        'Estadísticas',
        'Declaración de cookies',
        'Versión para móviles',
    ]
    const sombreado = 'text-blue-600 dark:text-blue-300 transition-colors hover:underline cursor-pointer'

    return (
        <footer className="px-4 lg:px-10 py-6 text-sm">
            <div className="max-w-[1440px] mx-auto w-full">
                <div className=" border-t border-gray-300 pt-4 flex gap-4 sm:flex-row flex-col items-center justify-between">
                    <div className="flex flex-col gap-5 ">
                        <div className="space-y-2 text-xs leading-5">
                            <p className="">
                                La página fue renderizada con Next.js.
                            </p>
                            <p>El código fuente está disponible bajo la <span className={sombreado}>Licencia MIT</span>, <span className={sombreado}>y los módulos de despliegue se rigen bajo los Términos de Servicio de Vercel</span>; pueden aplicarse políticas de uso justo (Fair Use) adicionales según el consumo de la infraestructura. Al usar esta plataforma, aceptas nuestras <span className={sombreado}>condiciones de despliegue</span> y nuestra <span className={sombreado}>política de privacidad de datos</span>. Codepedia® es una marca registrada de <span className={sombreado}>Codepedia Inc.</span> impulsada por tecnología de código abierto y optimizada para flujos de trabajo basados en la nube.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {footerItems.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    className={`${sombreado} text-xs`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 items-center justify-center sm:flex-col lg:flex-row">
                        <a className="flex border-1 p-2 gap-2 items-center bg-gray-100 dark:bg-gray-800 dark:border-gray-400 min-w-23" href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={20} className="text-black" />
                            <span className="text-xs"> GitHub</span>
                        </a>
                        <a className="flex border-1 p-2 gap-2 items-center bg-gray-100 dark:bg-gray-800 dark:border-gray-400 min-w-23" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <IoLogoLinkedin size={20} className="text-blue-600" />
                            <span className="text-xs ">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
