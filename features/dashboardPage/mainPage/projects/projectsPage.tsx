'use client'
import React from 'react'
import { ProjectsHeaderBar, ProjectsGrid } from './components'
import { useProjects } from './hooks'

export default function ProjectsPage() {
    const {
        proyectos,
        isLoading,
        skeletons,
        filterTab,
        toggleFilterTab,
        cargarProyectos,
        handleToggleDestacado,
        handleDeleteProject
    } = useProjects()

    return (
        <div className="max-w-[1600px] mx-auto flex flex-col h-full gap-1 bg-[#f9fafb] rounded-t-2xl min-h-[85vh]">
            <ProjectsHeaderBar
                isLoading={isLoading}
                filterTab={filterTab}
                onToggleFilterTab={toggleFilterTab}
                onRefresh={cargarProyectos}
            />

            <ProjectsGrid
                proyectos={proyectos}
                isLoading={isLoading}
                skeletons={skeletons}
                isFiltered={filterTab === 'destacados'}
                onResetFilter={toggleFilterTab}
                onToggleDestacado={handleToggleDestacado}
                onDelete={handleDeleteProject}
            />
        </div>
    )
}