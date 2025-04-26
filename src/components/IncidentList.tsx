import { Incident } from "../types/incident";
import IncidentCard from "./IncidentCard";

interface IncidentListProps {
    incidents: Incident[];
    onToggleExpand: (id: number) => void;
}

export default function IncidentList({ incidents, onToggleExpand }: IncidentListProps) {
    if (incidents.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No incidents found. Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {incidents.map((incident) => (
                <IncidentCard
                    key={incident.id}
                    incident={incident}
                    onToggleExpand={onToggleExpand}
                />
            ))}
        </div>
    );
}