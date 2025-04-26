import { useState } from "react";
import { motion } from "framer-motion";
import { CustomSelect } from "./CustomSelect";
import { Severity } from "../types/incident";

interface IncidentFormProps {
    onSubmit: (title: string, description: string, severity: Severity) => void;
    onCancel?: () => void;
}

export default function IncidentForm({ onSubmit, onCancel }: IncidentFormProps) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [severity, setSeverity] = useState<Severity>("Low");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !desc.trim()) return;

        setIsSubmitting(true);
        // Simulate async submission
        await new Promise(resolve => setTimeout(resolve, 500));

        onSubmit(title, desc, severity);
        setTitle("");
        setDesc("");
        setSeverity("Low");
        setIsSubmitting(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative"
        >
            {/* Close Button (Mobile Only) */}
            {onCancel && (
                <motion.button
                    onClick={onCancel}
                    whileTap={{ scale: 0.9 }}
                    className="lg:hidden absolute top-4 right-4 p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors z-10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.button>
            )}

            <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-600 to-blue-600">
                <h3 className="text-lg font-semibold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Report New Incident
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title*
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Brief incident title"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm transition-all duration-200"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description*
                    </label>
                    <textarea
                        id="description"
                        placeholder="Detailed description of what happened..."
                        rows={4}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm transition-all duration-200"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                </div>

                <CustomSelect<Severity>
                    id="severity"
                    value={severity}
                    onChange={setSeverity}
                    label="Severity Level"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </CustomSelect>

                <div className="pt-2 flex space-x-3">
                    {onCancel && (
                        <motion.button
                            type="button"
                            onClick={onCancel}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                        >
                            Cancel
                        </motion.button>
                    )}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${isSubmitting ? 'opacity-70' : ''}`}
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
                            'Submit Report'
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}