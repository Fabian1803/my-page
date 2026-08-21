'use client'
import { TagsHeaderBar, TagsTabsNav, TagsFilterBar, TagsTable } from './components'
import { useTagsAdmin } from './hooks/useTagsAdmin'

export default function AdminTagsPage() {
    const {
        tags,
        filteredTags,
        destacadasCount,
        isLoading,
        skeletons,
        searchFilter,
        setSearchFilter,
        filterTab,
        setFilterTab,
        copiedId,
        handleCopyId,
        selectedIds,
        handleSelectRow,
        handleSelectAll,
        cargarCategorias,
        handleDeleteTag,
        handleToggleDestacado
    } = useTagsAdmin()

    return (
        <div className="max-w-[1600px] mx-auto flex flex-col h-full gap-1 bg-[#f9fafb] rounded-t-2xl min-h-[85vh]">
            <TagsHeaderBar
                isLoading={isLoading}
                filterTab={filterTab}
                onToggleFilterTab={() => setFilterTab(prev => prev === 'destacados' ? 'all' : 'destacados')}
                onRefresh={cargarCategorias}
            />
            <TagsTabsNav
                filterTab={filterTab}
                totalCount={tags.length}
                destacadasCount={destacadasCount}
                onSelectTab={setFilterTab}
            />
            <TagsFilterBar
                searchFilter={searchFilter}
                onSearchChange={setSearchFilter}
                onClearSearch={() => setSearchFilter('')}
            />
            <TagsTable
                tags={filteredTags}
                isLoading={isLoading}
                skeletons={skeletons}
                searchFilter={searchFilter}
                selectedIds={selectedIds}
                copiedId={copiedId}
                onSelectRow={handleSelectRow}
                onSelectAll={handleSelectAll}
                onCopyId={handleCopyId}
                onToggleDestacado={handleToggleDestacado}
                onDeleteTag={handleDeleteTag}
                onResetFilters={() => {
                    setSearchFilter('')
                    setFilterTab('all')
                }}
            />
        </div>
    )
}