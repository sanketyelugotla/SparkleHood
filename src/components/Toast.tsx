import { motion } from "framer-motion";
import React from "react";

interface ToastProps {
    message: string;
    sub?: string; // Make sub optional
    onClose: () => void;
    success?: boolean; // Add an optional success prop, default to true
}

const Toast: React.FC<ToastProps> = ({ message, onClose, success = true }) => {
    const bgColor = success ? "bg-[#111a3a]" : "bg-rose-800"; // Set background color based on success

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50"
        >
            <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex flex-col items-start`}>
                <div className="flex items-center w-full justify-between"> {/* Container for icon, message, and close button */}
                    <div className="flex items-center">
                        <svg
                            className="w-5 h-5 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span>{message}</span>
                    </div>
                    {/* <button onClick={onClose} className="text-sky-200 hover:text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button> */}
                </div>
            </div>
        </motion.div>
    );
};

export default Toast;   