
import UserActionsHeader from '@/components/userActionsHeader'
import Image from 'next/image'
import InputSearch from '@/components/InputSearch'

function Tabs() {
    const tabs = ['Todo', 'Experiencia', 'Proyectos', 'Habilidades', 'Contacto', 'Sobre mí']
    return (
        <ul className="flex h-full items-center flex-nowrap list-none m-0 p-0 text-sm  whitespace-nowrap">
            {tabs.map((tab) => (
                <li key={tab} className="h-full px-4">
                    <p className="text-gray-500 cursor-pointer text-[14px] font-semibold border-black hover:border-b-3 hover:text-black h-full">
                        {tab}
                    </p>
                </li>
            ))}
        </ul>
    )
}


export default function FabianPageHeader() {
    return (
        <header className="border-gray-300 h-40 min-[500px]:h-35 flex justify-center border-b-[1px]">
            <div className="w-full h-full grid grid-cols-[150px_auto_130px] grid-rows-[35%_40%_25%] min-[500px]:grid-rows-[75%_25%]  
        max-[1461px]:max-w-[1110px]
        max-[1164px]:max-w-[860px]
        max-[940px]:max-w-[760px]">
                <div className="items-center flex col-span-3  min-[500px]:hidden">
                    <UserActionsHeader className='px-3 justify-between w-full' mobileoption={true} />
                </div>
                <div className="flex justify-center items-center max-[940px]:hidden">
                    <Image src="/log.png" alt="GoogleIcon" width={90} height={30} priority />
                </div>
                <div className="flex items-center px-3 min-[1461px]:col-span-2 max-[940px]:col-span-2 max-[500px]:col-span-3">
                    <InputSearch type="FabianPageInputType" placeholder="" />
                </div>
                <div className="flex justify-end max-[500px]:hidden">
                    <UserActionsHeader className='justify-end' />
                </div>
                <div className="h-full max-[500px]:pt-2 min-[1461px]:col-start-2 col-span-3 min-w-0 overflow-x-auto overflow-y-hidden scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <Tabs />
                </div>
            </div>

        </header>
    )
}