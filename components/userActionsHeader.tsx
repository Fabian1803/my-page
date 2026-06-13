import Image from 'next/image'
import WaffleMenuIcon from '@/components/userActionComponents/WaffleMenu'
import ProfileMenu from './profileMenuComponents/ProfileMenu'
interface UserActionsHeaderProps {
  className?: string,
  mobileoption?: boolean
  left?: boolean
}

export default function UserActionsHeader({ className, mobileoption, left }: UserActionsHeaderProps) {
  return (
    <div className={`flex items-center gap-2 pr-5  ${className || ''}`}>
      <WaffleMenuIcon left={left} />

      {mobileoption && (
          <div className="flex justify-center items-center min-[940px]:hidden">
            <Image src="/log.webp" alt="GoogleIcon" width={90} height={30} priority />
          </div>
        )}

      <ProfileMenu />
    </div>
  )
}