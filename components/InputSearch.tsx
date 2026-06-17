import { FiSearch } from 'react-icons/fi'
import Image from 'next/image'

interface InputSearchProps {
    type: 'FabianPageInputType' | 'SearchPageInputType'
    placeholder?: string
}

interface BodySectionProps {
    className?: string
    placeholder?: string
    showIcon?: boolean
    iconClass?: string
    iconPosition?: 'left' | 'right'
    showFabianLogo?: boolean
}

function BodySection({ className = '', placeholder = '', showIcon = false, iconClass = '', iconPosition = 'right', showFabianLogo = false }: BodySectionProps) {
    const posClass = iconPosition === 'left'
        ? 'col-start-1 order-first mr-2'
        : 'col-start-5 min-[940px]:col-start-4 order-last ml-2'

    return (
        <>
            {showIcon ? <FiSearch className={`${iconClass} ${posClass}`} /> : null}
            {showFabianLogo && (
                <div className="min-[940px]:hidden  rounded-full justify-center flex w-8">
                    <Image
                        src="/Flog.webp"
                        alt="Fabian logo"
                        width={30}
                        height={30}
                        className="shrink-0"
                        style={{ width: 30, minWidth: 30, height: 30, minHeight: 30 }}
                    />
                </div>
            )}


            <input
                type="text"
                placeholder={placeholder}
                className={`w-full h-[90%] border-none outline-none focus:outline-none bg-transparent ${className}`}
            />

            <Image
                src="/microIcon.png"
                alt="MicrofonoIcon"
                width={15}
                height={20}
                className="shrink-0"
                style={{ width: 15, minWidth: 15, height: 20, minHeight: 20 }}
            />
            <Image
                src="/camaraIcon.png"
                alt="CamaraIcon"
                width={25}
                height={25}
                className="shrink-0"
                style={{ width: 25, minWidth: 25, height: 25, minHeight: 25 }}
            />
        </>
    )
}

export default function InputSearch({ type = 'SearchPageInputType', placeholder = '' }: InputSearchProps) {
    const isFabian = type === 'FabianPageInputType'

    const containerClass = isFabian
        ? 'h-[52px] rounded-[30px] px-[10px] border border-solid border-gray-300 shadow-[0_6px_10px_rgba(0,0,0,0.05)] grid items-center grid-cols-[30px_auto_20px_20px_30px] min-[940px]:grid-cols-[auto_20px_20px_30px] gap-3 max-w-[850px] w-full min-[1164px]:w-[90%]'
        : 'h-[45px] rounded-[30px] px-[15px] border border-solid border-current grid items-center grid-cols-[20px_auto_20px_20px] max-[450px]:grid-cols-[6%_auto_6%_6%]'

    return (
        <div className={containerClass}>
            {isFabian ? (
                <BodySection className="w-full" placeholder={placeholder} showIcon showFabianLogo iconClass="text-[18px] shrink-0 text-blue-500 cursor-pointer" iconPosition="right" />
            ) : (
                <BodySection placeholder={placeholder} showIcon iconClass="text-[18px]" iconPosition="left" />
            )}
        </div>
    )
}