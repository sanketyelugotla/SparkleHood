import { AnimatePresence } from "framer-motion";
import IncidentCard from "./IncidentCard";
import { useIncidents } from "../context/IncidentContext";

export default function IncidentList() {
    const { filteredIncidents, currentPage, itemsPerPage } = useIncidents();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedIncidents = filteredIncidents.slice(startIndex, startIndex + itemsPerPage);

    if (filteredIncidents.length === 0) {
        return (
            <div className="p-6 text-center text-sky-400">
                No incidents found. Try adjusting your filters or search.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {paginatedIncidents.map((incident) => (
                    <IncidentCard
                        key={incident.id}
                        incident={incident}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}