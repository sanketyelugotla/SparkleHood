import { CustomSelect } from "./CustomSelect";
import { Severity } from "../types/incident";
import { useState } from "react";

interface IncidentFilterProps {
    filter: Severity | "All";
    setFilter: (filter: Severity | "All") => void;
    sort: "Newest" | "Oldest";
    setSort: (sort: "Newest" | "Oldest") => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

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
                    {/* ... search input implementation ... */}
                </div>

                {/* Filter and Sort */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomSelect<Severity | "All">
                        id="severity-filter"
                        value={filter}
                        onChange={setFilter}
                        label="Severity"
                    >
                        <option value="All">All Severities</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </CustomSelect>

                    <CustomSelect<"Newest" | "Oldest">
                        id="sort"
                        value={sort}
                        onChange={setSort}
                        label="Sort by"
                    >
                        <option value="Newest">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                                Newest First
                            </div>
                        </option>
                        <option value="Oldest">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                Oldest First
                            </div>
                        </option>
                    </CustomSelect>
                </div>
            </div>
        </div>
    );
}