import { Severity } from "../types/incident";

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
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                        Search incidents
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search titles and descriptions..."
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-700 mb-1">
                            Severity
                        </label>
                        <select
                            id="severity-filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as Severity | "All")}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md"
                        >
                            <option value="All">All Severities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                            Sort by
                        </label>
                        <select
                            id="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value as "Newest" | "Oldest")}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md"
                        >
                            <option value="Newest">Newest First</option>
                            <option value="Oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}