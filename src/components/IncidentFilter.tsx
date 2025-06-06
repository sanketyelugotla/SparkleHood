import { Severity } from "../types/incident";
import { useState } from "react";
import { motion } from "framer-motion";
import { CustomSelect } from "./CustomSelect";
import { useIncidents } from "../context/IncidentContext";

export default function IncidentFilter() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const {
        filter,
        setFilter,
        sort,
        setSort,
        searchQuery,
        setSearchQuery
    } = useIncidents();

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#050816] rounded-xl shadow-sm border border-sky-900 p-4 sm:p-6"
        >
            <div className="space-y-4">
                {/* Search Input */}
                <div>
                    <label htmlFor="search" className="block text-xl font-bold text-sky-300 mb-1">
                        Search incidents
                    </label>
                    <div
                        className={`relative rounded-md border-2 ${isSearchFocused ? 'border-sky-500' : 'border-sky-800'} hover:border-sky-500 transition-all`}
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search titles and descriptions..."
                            className="block w-full pl-10 pr-10 py-2 bg-[#050816] text-sky-100 focus:outline-none focus:ring-0"
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
                                <svg className="h-4 w-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter and Sort */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Severity Filter */}
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

                    {/* Sort By */}
                    <CustomSelect<"Newest" | "Oldest">
                        id="sort"
                        value={sort}
                        onChange={setSort}
                        label="Sort by"
                    >
                        <option value="Newest">Newest First</option>
                        <option value="Oldest">Oldest First</option>
                    </CustomSelect>
                </div>
            </div>
        </motion.div>
    );
}