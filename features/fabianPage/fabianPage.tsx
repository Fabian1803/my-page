import { FabianPageFooter, FabianPageHeader, FabianPageMain } from './components';
export default function FabianPage() {
  return (
    <div className="grid min-h-screen bg-white text-black grid-rows-[auto_1fr_auto]">
      <FabianPageHeader />
      <FabianPageMain />
      <FabianPageFooter />
    </div>
  )
}
