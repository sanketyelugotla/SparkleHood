import { Incident } from "../types/incident";
import { motion, AnimatePresence } from "framer-motion";
import { useIncidents } from "../context/IncidentContext";

interface IncidentCardProps {
    incident: Incident;
}

export default function IncidentCard({ incident }: IncidentCardProps) {
    const { searchQuery, toggleExpand, deleteIncident, showToast } = useIncidents(); // Ensure showToast is destructured

    const severityColors = {
        Low: "bg-emerald-900 text-emerald-200 border-emerald-700",
        Medium: "bg-amber-900 text-amber-200 border-amber-700",
        High: "bg-rose-900 text-rose-200 border-rose-700",
    };

    // Check if description contains search query (for the indicator)
    const hasMatchInDescription = searchQuery &&
        incident.description.toLowerCase().includes(searchQuery.toLowerCase());

    const handleCardClick = () => {
        toggleExpand(incident.id);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this incident?")) {
            deleteIncident(incident.id);
            showToast("Incident deleted successfully!", false); // Correctly call showToast
        }
    };

    // Improved highlight function with regex escaping
    const highlightText = (text: string) => {
        if (!searchQuery || !text.toLowerCase().includes(searchQuery.toLowerCase())) {
            return text;
        }

        const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                        <mark key={i} className="bg-blue-400 text-gray-900">{part}</mark>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 hover:bg-[#0a1026] transition-colors duration-150 cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <h3 className="text-base sm:text-lg font-semibold text-sky-100 truncate">
                            {searchQuery ? highlightText(incident.title) : incident.title}
                        </h3>
                        <span className={`mt-1 sm:mt-0 px-2 py-1 text-xs font-medium rounded-md border ${severityColors[incident.severity]} whitespace-nowrap self-start`}>
                            {incident.severity}
                        </span>
                    </div>

                    <div className="mt-2 sm:mt-2 flex items-center text-xs sm:text-sm text-sky-400">
                        <svg className="flex-shrink-0 mr-1.5 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(incident.reported_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        {hasMatchInDescription && !incident.expanded && (
                            <span className="ml-2 px-2 py-0.5 bg-yellow-900/50 text-yellow-200 text-xs rounded">
                                Match in description
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(incident.id);
                        }}
                        className="flex-shrink-0 inline-flex items-center px-2 sm:px-3 py-1 border border-sky-600 text-xs sm:text-sm font-medium rounded-md text-sky-100 bg-sky-800 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 cursor-pointer"
                    >
                        {incident.expanded ? "Hide" : "Details"}
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDelete}
                        className="flex-shrink-0 inline-flex items-center px-2 py-1 border border-rose-600 text-xs sm:text-sm font-medium rounded-md text-rose-100 bg-rose-800 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 cursor-pointer"
                        aria-label="Delete incident"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </motion.button>
                </div>
            </div>
            <AnimatePresence>
                {incident.expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 pt-3 border-t border-sky-800">
                            <p className="text-sm sm:text-base text-sky-200 whitespace-pre-line">
                                {highlightText(incident.description)}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}