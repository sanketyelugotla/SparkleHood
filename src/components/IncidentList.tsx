import { Incident } from "../types/incident";
import IncidentCard from "./IncidentCard";
import { AnimatePresence, } from "framer-motion";

interface IncidentListProps {
    incidents: Incident[];
    onToggleExpand: (id: number) => void;
    searchQuery?: string;
}

export default function IncidentList({ incidents, onToggleExpand, searchQuery }: IncidentListProps) {
    if (incidents.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                No incidents found. Try adjusting your filters or search.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {incidents.map((incident) => (
                    <IncidentCard
                        key={incident.id}
                        incident={incident}
                        onToggleExpand={onToggleExpand}
                        searchQuery={searchQuery}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}