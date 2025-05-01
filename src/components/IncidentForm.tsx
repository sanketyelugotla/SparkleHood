import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIncidents } from '../context/IncidentContext';
import { Severity } from '../types/incident';

interface IncidentFormProps {
    onCancel: () => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onCancel }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [severity, setSeverity] = useState<Severity>("Low");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addIncident } = useIncidents();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !desc.trim()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        addIncident({ title, description: desc, severity });
        setTitle("");
        setDesc("");
        setSeverity("Low");
        setIsSubmitting(false);
        onCancel();
    };

    return (
        <div className="rounded-xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="min-h-[600px]"
            >
                <div className="p-4 sm:p-6 bg-gradient-to-r from-sky-600 to-blue-600 rounded-t-xl">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Report New Incident
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 flex-grow flex flex-col">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-sky-300 mb-1">
                            Title*
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Brief incident title"
                            className="w-full px-3 py-2 rounded-md bg-[#050816] border border-sky-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-sky-300 mb-1">
                            Description*
                        </label>
                        <textarea
                            id="description"
                            placeholder="Detailed description of what happened..."
                            rows={6}
                            className="w-full px-3 py-2 rounded-md bg-[#050816] border border-sky-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="severity" className="block text-sm font-medium text-sky-300 mb-1">
                            Severity Level
                        </label>
                        <select
                            id="severity"
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value as Severity)}
                            className="w-full px-3 py-2 rounded-md bg-[#050816] border border-sky-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="pt-2 flex space-x-3">
                        {/* <motion.button
                            type="button"
                            onClick={onCancel}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 py-2 px-4 border border-sky-800 rounded-md shadow-sm text-sm font-medium text-sky-300 bg-[#050816] hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all"
                        >
                            Cancel
                        </motion.button> */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileTap={{ scale: 0.95 }}
                            className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all ${isSubmitting ? 'opacity-70' : ''} cursor-pointer`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                <p>Submit Report</p>
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default IncidentForm;