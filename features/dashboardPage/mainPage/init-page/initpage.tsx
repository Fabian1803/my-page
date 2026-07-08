import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaPen } from 'react-icons/fa'
import { MdContentCopy, MdLoyalty, MdOutlineAlternateEmail, MdOutlineAssignmentInd, MdOutlineDashboard, MdOutlinePermIdentity } from 'react-icons/md'

export default function Initpage() {
  const link = [
          { href: '/dashboard/proyectos', label: 'Proyectos', icon: <MdOutlineDashboard size={24} /> },
          { href: '/dashboard/certificados', label: 'Certificados', icon: <MdOutlineAssignmentInd size={24} /> },
          { href: '/dashboard/etiquetas', label: 'Etiquetas', icon: <MdLoyalty size={24} /> },
          { href: '/dashboard/cv', label: 'CV', icon: <MdOutlineAssignmentInd size={24} /> },
          { href: '/dashboard/about-me', label: 'Sobre mí', icon: <MdOutlinePermIdentity size={24} /> },
          { href: '/dashboard/redes-sociales', label: 'Redes Sociales', icon: <MdOutlineAlternateEmail size={24} /> },
      ]
      
  return (
    <div className='w-full grid lg:grid-rows-[45%_55%] h-full'>
      <div className="bg-[#f9fafb] border-b border-[#e4e5e8] rounded-t-2xl flex items-center justify-center overflow-hidden">
        <div className="w-full px-5 min-[1170px]:px-0 max-w-[1080px] flex max-lg:flex-col justify-between lg:items-end relative h-full z-10">
          <div className="hidden md:block absolute top-[40px] left-[42%] w-4 h-5 bg-[#4286f5] rounded-full blur-[0.5px]" />
          <div className="hidden md:block absolute bottom-[120px] left-[55%] w-5 h-6 bg-[#FBBC05] rounded-full blur-[0.5px]" />
          <div className="hidden md:block absolute top-[40px] right-[3%] w-6 h-7 bg-[#34A853] rounded-full blur-[0.5px]" />
          <svg
            className="hidden md:block absolute right-[12%] top-[-10px] h-[260px] w-auto text-[#808593]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
          >
            <polygon points="40,20 70,45 40,45" />
            <line x1="28" y1="45" x2="40" y2="32" />
            <line x1="28" y1="45" x2="50" y2="45" />
            <line x1="40" y1="45" x2="40" y2="70" strokeDasharray="1" />
            <line x1="40" y1="70" x2="70" y2="45" strokeDasharray="1" />
          </svg>

          <div className="z-10 flex flex-col gap-4 py-10">
            <div className="flex gap-4 items-center">
              <div className="justify-center items-center flex shrink-0">
                <Image src="/iconCloud.webp" alt="Logo" width={36} height={36} priority />
              </div>
              <h1 className="text-[36px] font-sans font-medium text-[#202124] tracking-tight">
                Te damos la bienvenida
              </h1>
            </div>
            <div className="flex gap-1 items-center">
              <span className='text-[18px]'>Estás trabajando en </span><div className="text-[#0c68e0] hover:bg-blue-50 p-1 text-[18px]">Mi portafolio</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4"> {/* flex-col en móvil para que no se amontone */}
              <div className="flex items-center gap-2"><span className='text-[14px]'>Número de proyecto: 432046297103 </span><div className="hover:bg-gray-200 rounded-full p-2"><MdContentCopy /></div></div>
              <div className="flex items-center gap-2"><span className='text-[14px]'>ID del proyecto: elite-bird-469429-m5  </span><div className="hover:bg-gray-200 rounded-full p-2"><MdContentCopy /></div></div>
            </div>
            <div className="text-[#0c68e0] flex gap-4">
              <span className="pb-[1px] border-b cursor-pointer">Panel</span>
              <span className="pb-[1px] border-b cursor-pointer">Fabian Hub</span>
            </div>
          </div>
          
          <Link href="/panel" className="z-10 lg:h-[80%] lg:w-58 bg-[#e9f0fe] hover:shadow-lg rounded-t-md p-6 flex flex-col justify-between gap-4 transition-all duration-200">
            <span className="text-[18px]">Gestiona tus proyectos en una infraestructura en la nube diseñada tus ideas con rendimiento profesional</span>
            <div className="flex justify-between items-center"><span className="text-[18px]">Ver más</span><FaArrowRight /></div>
          </Link>

        </div>
      </div>

      <div className="bg-white p-6 flex justify-center">
        <div className="w-full max-w-[1080px]">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium text-gray-800">Acceso rápido</p>
            <button className="flex gap-2 items-center text-sm font-semibold text-[#0c68e0] hover:text-[#1856b3] cursor-pointer transition-colors">
              <FaPen size={14} />
              <span>Actualizar tu perfil de Cloud</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-5">
            {link.map((item, index) => (
              <Link href={item.href}
                key={index}
                className="border font-semibold border-gray-300 rounded-lg px-4 py-8 flex items-center gap-3 hover:shadow-lg cursor-pointer group"
              >
                  {item.icon}
                  <p className="text-[16px] font-medium text-gray-800 truncate">{item.label}</p>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}