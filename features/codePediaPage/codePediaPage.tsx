import { CodePediaFooter, CodePediaHeader, CodePediaMain, CodePediaNavbar, CodePediaSection } from "./components";
export default function CodepediaPage() {
  return (
    <>
      <CodePediaHeader />
      <main className="flex flex-1 px-4 lg:px-10">
        <div className="w-full">
          <CodePediaNavbar />
          <CodePediaMain />
        </div>
        <div className="w-70 hidden lg:flex">
          <CodePediaSection />
        </div>
      </main>
      <CodePediaFooter />
    </>
  )
}
