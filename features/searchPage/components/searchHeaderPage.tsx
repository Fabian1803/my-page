import UserActionsHeader from '@/components/userActionsHeader'
export default function SearchHeaderPage() {
  return (
    <header className="flex h-full items-center justify-end gap-2">
      <p>Github</p>
      <p>Linkedin</p>
      <UserActionsHeader />
    </header>
  )
}