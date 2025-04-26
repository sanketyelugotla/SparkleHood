import { useState } from "react";
import { Severity } from "../types/incident";
import { motion } from "framer-motion";

interface IncidentFilterProps {
    filter: Severity | "All";
    setFilter: (filter: Severity | "All") => void;
    sort: "Newest" | "Oldest";
    setSort: (sort: "Newest" | "Oldest") => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SelectOption = ({ value, children }: { value: string; children: React.ReactNode }) => (
    <option value={value}>{children}</option>
);

export default function IncidentFilter({
    filter,
    setFilter,
    sort,
    setSort,
    searchQuery,
    setSearchQuery,
}: IncidentFilterProps) {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="space-y-4">
                {/* Search Input */}
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                        Search incidents
                    </label>
                    <motion.div
                        animate={{
                            borderColor: isSearchFocused ? "#6366f1" : "#d1d5db",
                            boxShadow: isSearchFocused ? "0 0 0 3px rgba(99, 102, 241, 0.1)" : "none"
                        }}
                        transition={{ duration: 0.2 }}
                        className="relative rounded-md border border-gray-300"
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search titles and descriptions..."
                            className="block w-full pl-10 pr-3 py-2 border-0 bg-transparent focus:ring-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </motion.div>
                </div>

                {/* Filter and Sort */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Severity Filter */}
                    <div>
                        <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-700 mb-1">
                            Severity
                        </label>
                        <select
                            id="severity-filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as Severity | "All")}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md transition-all duration-200"
                        >
                            <SelectOption value="All">All Severities</SelectOption>
                            <SelectOption value="Low">Low</SelectOption>
                            <SelectOption value="Medium">Medium</SelectOption>
                            <SelectOption value="High">High</SelectOption>
                        </select>
                    </div>

                    {/* Sort By */}
                    <div>
                        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                            Sort by
                        </label>
                        <select
                            id="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value as "Newest" | "Oldest")}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md transition-all duration-200"
                        >
                            <SelectOption value="Newest">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                    Newest First
                                </div>
                            </SelectOption>
                            <SelectOption value="Oldest">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    Oldest First
                                </div>
                            </SelectOption>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}