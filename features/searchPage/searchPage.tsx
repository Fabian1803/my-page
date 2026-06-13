import React from 'react'
import { SearchFooterPage, SearchHeaderPage, SearchMainPage } from "./components"

export default function SearchPage() {
  return (
    <div className="grid h-screen bg-white text-black grid-rows-[60px_auto_95px] max-[600px]:grid-rows-[60px_auto_140px]">
      <SearchHeaderPage />
      <SearchMainPage />
      <SearchFooterPage />
    </div>
  )
}