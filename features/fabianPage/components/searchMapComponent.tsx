interface searchMapComponentProps {
    children?: React.ReactNode,
}
export default function SearchMapComponent({ children }: searchMapComponentProps) {
    return (
        <main>
            <div className=" mx-auto max-[940px]:w-full min-[1461]:pl-36
            max-[1461px]:max-w-[1110px]
        max-[1164px]:max-w-[860px]
        max-[940px]:w-[760px]">
                {children}
            </div>
        </main>
    )
}
