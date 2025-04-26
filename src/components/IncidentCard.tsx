import { Incident } from "../types/incident";
import { motion, AnimatePresence } from "framer-motion";

interface IncidentCardProps {
    incident: Incident;
    onToggleExpand: (id: number) => void;
}

export default function IncidentCard({ incident, onToggleExpand }: IncidentCardProps) {
    const severityColors = {
        Low: "bg-emerald-100 text-emerald-800",
        Medium: "bg-amber-100 text-amber-800",
        High: "bg-rose-100 text-rose-800",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200 last:border-b-0"
        >
            <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                            {incident.title}
                        </h3>
                        <span className={`mt-1 sm:mt-0 px-2 py-1 text-xs font-medium rounded-md ${severityColors[incident.severity]} whitespace-nowrap self-start`}>
                            {incident.severity}
                        </span>
                    </div>

                    <div className="mt-2 sm:mt-2 flex items-center text-xs sm:text-sm text-gray-500">
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
                    </div>
                </div>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleExpand(incident.id)}
                    className="flex-shrink-0 inline-flex items-center px-2 sm:px-3 py-1 border border-transparent text-xs sm:text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {incident.expanded ? "Hide" : "Details"}
                </motion.button>
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
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line">{incident.description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}