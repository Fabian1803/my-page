'use client'
import React from 'react'
import { TagItem } from '../services/tagServices'
import TagsMobileList from './TagsMobileList'
import TagsDesktopTable from './TagsDesktopTable'
import TagsEmptyState from './TagsEmptyState'

interface TagsTableProps {
    tags: TagItem[];
    isLoading: boolean;
    skeletons: number[];
    searchFilter: string;
    selectedIds: string[];
    copiedId: string | null;
    onSelectRow: (id: string) => void;
    onSelectAll: () => void;
    onCopyId: (id: string) => void;
    onToggleDestacado: (id: string) => void;
    onDeleteTag: (id: string, nombre: string) => void;
    onResetFilters: () => void;
}

export default function TagsTable({
    tags,
    isLoading,
    skeletons,
    searchFilter,
    selectedIds,
    copiedId,
    onSelectRow,
    onSelectAll,
    onCopyId,
    onToggleDestacado,
    onDeleteTag,
    onResetFilters
}: TagsTableProps) {
    const isAllSelected = tags.length > 0 && selectedIds.length === tags.length

    return (
        <div className="bg-white flex-1 overflow-hidden flex flex-col">
            <TagsMobileList
                tags={tags}
                isLoading={isLoading}
                skeletons={skeletons}
                selectedIds={selectedIds}
                copiedId={copiedId}
                isAllSelected={isAllSelected}
                onSelectRow={onSelectRow}
                onSelectAll={onSelectAll}
                onCopyId={onCopyId}
                onToggleDestacado={onToggleDestacado}
                onDeleteTag={onDeleteTag}
            />
            <TagsDesktopTable
                tags={tags}
                isLoading={isLoading}
                skeletons={skeletons}
                selectedIds={selectedIds}
                copiedId={copiedId}
                isAllSelected={isAllSelected}
                onSelectRow={onSelectRow}
                onSelectAll={onSelectAll}
                onCopyId={onCopyId}
                onToggleDestacado={onToggleDestacado}
                onDeleteTag={onDeleteTag}
            />
            {!isLoading && tags.length === 0 && (
                <TagsEmptyState
                    searchFilter={searchFilter}
                    onResetFilters={onResetFilters}
                />
            )}
        </div>
    )
}
