import { AnimatePresence } from "framer-motion";
import IncidentCard from "./IncidentCard";
import { useIncidents } from "../context/IncidentContext";
import { useEffect } from "react";

export default function IncidentList() {
    const {
        filteredIncidents,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        incidents,
        searchQuery,
        setExpanded
    } = useIncidents();

    // Handle search-based expansion/collapse
    useEffect(() => {
        filteredIncidents.forEach(incident => {
            const shouldBeExpanded = searchQuery &&
                (incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    incident.description.toLowerCase().includes(searchQuery.toLowerCase()));

            setExpanded(incident.id, !!shouldBeExpanded);
        });
    }, [searchQuery, filteredIncidents, setExpanded]);

    const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage);
    const paginatedIncidents = filteredIncidents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (filteredIncidents.length === 0) {
        return (
            <div className="p-6 text-center text-sky-400">
                No incidents found. Try adjusting your filters or search.
            </div>
        );
    }

    return (
        <div className="rounded-xl shadow-sm border border-sky-900 overflow-hidden">
            {/* // bg - [#0a1026] */}
            <div className="p-4 sm:p-6 border-b border-sky-900 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-semibold text-sky-300 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Incident Reports
                </h2>
                <span className="text-sm text-sky-400">
                    Showing {filteredIncidents.length} of {incidents.length}
                </span>
            </div>

            <div className="p-4 space-y-4">
                <AnimatePresence>
                    {paginatedIncidents.map((incident) => (
                        <div
                            key={incident.id}
                            className="bg-[#050816] rounded-lg overflow-hidden border border-sky-900"
                        >
                            <IncidentCard incident={incident} />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {totalPages > 1 && (
                <div className="p-4 border-t border-sky-900 flex justify-between items-center">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-sky-900 text-sky-500 cursor-not-allowed' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
                    >
                        Previous
                    </button>
                    <span className="text-sky-300">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-sky-900 text-sky-500 cursor-not-allowed' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}