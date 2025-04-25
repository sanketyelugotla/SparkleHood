import { useState } from "react";
import { Severity } from "../types/incident";

interface IncidentFormProps {
    onSubmit: (title: string, description: string, severity: Severity) => void;
}

export default function IncidentForm({ onSubmit }: IncidentFormProps) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [severity, setSeverity] = useState < Severity > ("Low");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !desc.trim()) return;
        onSubmit(title, desc, severity);
        setTitle("");
        setDesc("");
        setSeverity("Low");
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-600">
                <h3 className="text-lg font-semibold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Report New Incident
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Brief incident title"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Detailed description of what happened..."
                        rows={4}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                        Severity Level
                    </label>
                    <select
                        id="severity"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value as Severity)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit Incident Report
                    </button>
                </div>
            </form>
        </div>
    );
}