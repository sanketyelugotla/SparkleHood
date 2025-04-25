import { Incident } from "../types/incident";

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
        <div className="p-6 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200 last:border-b-0">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${severityColors[incident.severity]}`}>
                            {incident.severity}
                        </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <button
                    onClick={() => onToggleExpand(incident.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {incident.expanded ? "Hide" : "Details"}
                </button>
            </div>
            {incident.expanded && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-700 whitespace-pre-line">{incident.description}</p>
                </div>
            )}
        </div>
    );
}