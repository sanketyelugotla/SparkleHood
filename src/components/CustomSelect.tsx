import { useState, useRef, useEffect, ReactNode, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomSelectProps<T extends string> {
    value: T;
    onChange: (value: T) => void;
    id: string;
    label: string;
    children: ReactNode;
    className?: string;
}

interface OptionProps {
    value: string;
    children: ReactNode;
}

function isOptionElement(child: ReactNode): child is React.ReactElement<OptionProps> {
    return (
        child !== null &&
        typeof child === "object" &&
        "props" in child &&
        typeof child.props !== "undefined" &&
        child.props !== null &&
        child.props.hasOwnProperty("value")
    );
}

export function CustomSelect<T extends string>({
    value,
    onChange,
    id,
    label,
    children,
    className = ""
}: CustomSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedLabel = Children.toArray(children)
        .filter(isOptionElement)
        .find((child) => child.props.value === value)?.props.children;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ${className}`} ref={selectRef}>
            {label && (
                <label htmlFor={id} className="block text-md font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                id={id}
                className="relative w-full pl-3 pr-10 py-2 text-left border-2 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-500"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="block truncate">{selectedLabel}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <motion.svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200"
                        role="listbox"
                        style={{ transformOrigin: "top center" }}
                    >
                        {Children.map(children, (child) => {
                            if (isOptionElement(child)) {
                                return (
                                    <li
                                        key={child.props.value}
                                        className={`text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${value === child.props.value ? "bg-indigo-100" : ""
                                            }`}
                                        role="option"
                                        onClick={() => {
                                            onChange(child.props.value as T);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <span className="block truncate">{child.props.children}</span>
                                        {value === child.props.value && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                        )}
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>

            <select
                id={`${id}-native`}
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                className="hidden"
            >
                {children}
            </select>
        </div >
    );
}
