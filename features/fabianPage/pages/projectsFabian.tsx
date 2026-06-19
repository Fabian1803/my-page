import SearchMapComponent from '../components/searchMapComponent'
import Link from 'next/link'
export default function ProjectsFabian() {
    return (
        <SearchMapComponent>
            <Link href="/Codepedia" className="gap-2 p-4 grid grid-cols-[auto_140] min-[500px]:grid-cols-[auto_180] max-w-200">
                <div className="flex gap-2 flex-col max-[500px]:col-span-2">
                    <p className="text-md font-bold">Destacado</p>
                    <div className="grid grid-cols-[40_auto] grid-rows-2 items-center h-9">
                        <div className="row-span-2 flex justify-center">
                            <div className="bg-blue-400 rounded-full w-8 h-8"></div>
                        </div>
                        <h3 className="text-sm font-bold line-clamp-1">Titulo de la pagina Titulo de la pagina Titulo de la pagina</h3>
                        <p className="text-xs line-clamp-1">https://example.com/example.com/example.com/example.com</p>
                    </div>
                </div>
                <div className="col-start-1 min-[500px]:row-start-2">
                    <h1 className="text-blue-800 font-bold">Titulo de la pagina</h1>
                    <p className="line-clamp-5 md:line-clamp-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor si  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor si Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
                </div>
                <div className="flex items-center justify-center row-span-2 col-start-2">
                    <div className="w-40 h-40 max-[500px]:w-30 max-[500px]:h-30 rounded-2xl bg-amber-400"></div>
                </div>
            </Link>
        </SearchMapComponent>
    )
}
