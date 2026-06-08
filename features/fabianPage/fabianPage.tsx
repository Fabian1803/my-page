import { FabianPageFooter, FabianPageHeader, FabianPageMain } from './components';
export default function FabianPage() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <FabianPageHeader />
      <FabianPageMain />
      <FabianPageFooter />
    </div>
  )
}
