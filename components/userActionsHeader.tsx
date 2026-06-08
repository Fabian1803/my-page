import Image from 'next/image'
import { FiMoreVertical } from 'react-icons/fi'

interface UserActionsHeaderProps {
  className?: string,
  mobileoption?: boolean
}

export default function UserActionsHeader({ className, mobileoption }: UserActionsHeaderProps) {
  return (
    <div className={`flex items-center gap-2 pr-5  ${className || ''}`}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 6px)',
          width: '35px',
          height: '35px',
          gap: '-10px',
          fontSize: '22px',
          alignItems: 'center',
          borderRadius: '50%',
        }}
        className="hover:bg-gray-300 cursor-pointer"
      >
        <FiMoreVertical />
        <FiMoreVertical />
        <FiMoreVertical />
      </div>

      {
        mobileoption && (
          <div className="flex justify-center items-center min-[940px]:hidden">
            <Image src="/log.png" alt="GoogleIcon" width={90} height={30} priority />
          </div>
        )
      }

      {/* Avatar de Perfil */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 cursor-pointer">
        {/* Aquí irá tu <Image /> de Next cuando lo configures */}
      </div>
    </div>
  )
}