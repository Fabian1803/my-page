'use client'
import React from 'react'
import { MdSearch, MdAdd, MdClose, MdDns } from 'react-icons/md'
import { useTagsSelector } from '../hooks/useTagSelector';

interface TagSelectorProps {
    selectedTags: string[];
    onTagsChange: (tags: string[]) => void;
    onClick?: () => void;
}

export default function TagSelector({ selectedTags, onTagsChange, onClick }: TagSelectorProps) {
    const { searchQuery, setSearchQuery, filteredTags, isExactMatch, handleToggleTag, handleCreateNewTag } = useTagsSelector({ selectedTags, onTagsChange })
    
    return (
        <div className="w-full mt-4 space-y-4" onClick={onClick}>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                   Etiquetas de recursos y zonas de red
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                    Select deployment zones and tags to provision resource distribution across virtual nodes.
                </p>
            </div>
            <div className="w-full border border-gray-300 rounded-sm bg-white overflow-hidden">
                <div className="p-3 bg-[#f8f9fa] border-b border-gray-200 flex gap-2 items-center">
                    <div className="relative flex-1 max-w-xs">
                        <MdSearch size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter regions or tags..."
                            className="w-full pl-8 pr-3 py-1 bg-white border border-gray-300 rounded-sm text-xs font-normal text-gray-800 focus:outline-none focus:border-[#3367d6]"
                        />
                    </div>
                    
                    {searchQuery.trim() !== '' && !isExactMatch && (
                        <button
                            type="button"
                            onClick={handleCreateNewTag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#3367d6] text-white hover:bg-[#2a56b9] font-medium text-xs rounded-sm transition-colors whitespace-nowrap"
                        >
                            <MdAdd size={14} />
                            Deploy custom tag: "{searchQuery.trim()}"
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-12 px-4 py-2 bg-[#f8f9fa] border-b border-gray-200 text-[11px] font-medium text-gray-500 uppercase tracking-wider blueprint-header">
                    <div className="col-span-6 text-left">Resource Tag / Node Name</div>
                    <div className="col-span-3 text-center">Status</div>
                    <div className="col-span-3 text-right">Zone Network</div>
                </div>
                <div className="max-h-64 overflow-y-auto block w-full divide-y divide-gray-200">
                    {filteredTags.map((tag, index) => {
                        const isSelected = selectedTags.includes(tag);
                        const dummyLatency = `${(index * 12 + 15) % 80 + 10}ms`;
                        
                        return (
                            <div 
                                key={tag}
                                onClick={() => handleToggleTag(tag)}
                                className={`grid grid-cols-12 px-4 py-2.5 items-center text-xs transition-colors cursor-pointer select-none w-full text-left ${
                                    isSelected ? 'bg-[#e8f0fe]' : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="col-span-6 font-medium text-gray-800 flex items-center gap-2 pointer-events-none select-none">
                                    <span className={`w-2 h-2 rounded-full shrink-0 pointer-events-none ${isSelected ? 'bg-[#3367d6]' : 'bg-gray-300'}`} />
                                    <span className="truncate pointer-events-none">{tag}</span>
                                </div>
                                <div className="col-span-3 flex justify-center pointer-events-none select-none">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium pointer-events-none ${
                                        isSelected 
                                            ? 'bg-blue-100 text-[#3367d6]' 
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {isSelected ? 'Provisioned' : 'Available'}
                                    </span>
                                </div>
                                <div className="col-span-3 flex items-center justify-end gap-3 text-gray-400 text-right font-mono text-[11px] pointer-events-none select-none">
                                    <span className="pointer-events-none">{dummyLatency}</span>
                                    <div className="w-4 h-4 flex items-center justify-center shrink-0 pointer-events-none">
                                        {isSelected && <MdClose size={14} className="text-gray-500 pointer-events-none" />}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                    {filteredTags.length === 0 && (
                        <div className="p-4 text-center text-xs text-gray-400 italic">
                            No active clusters found. Use the filter field to deploy a new tag.
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}