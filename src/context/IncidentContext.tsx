import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Incident, Severity } from '../types/incident';
import { mockIncidents } from '../data/mockData';
import Toast from '../components/Toast'; // Import the Toast component
import { AnimatePresence } from 'framer-motion';

type IncidentContextType = {
    incidents: Incident[];
    filteredIncidents: Incident[];
    addIncident: (incident: Omit<Incident, 'id' | 'reported_at'>) => void;
    deleteIncident: (id: number) => void;
    toggleExpand: (id: number) => void;
    setExpanded: (id: number, expanded: boolean) => void;
    filter: Severity | 'All';
    setFilter: (filter: Severity | 'All') => void;
    sort: 'Newest' | 'Oldest';
    setSort: (sort: 'Newest' | 'Oldest') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number;
    showToast: (message: string, success?: boolean) => void; // Add showToast function type
};

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
    const [filter, setFilter] = useState<Severity | "All">("All");
    const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [toast, setToast] = useState<{ message: string, success?: boolean } | null>(null); // State for the toast

    // Function to trigger the toast
    const showToast = useCallback((message: string, success: boolean = true) => {
        setToast({ message, success });
        setTimeout(() => setToast(null), 3000);
    }, []);

    // Wrap setExpanded in useCallback to prevent unnecessary recreations
    const setExpanded = useCallback((id: number, expanded: boolean) => {
        setIncidents(prev =>
            prev.map(i =>
                i.id === id ? { ...i, expanded } : i
            )
        );
    }, []);

    // Memoize filtered incidents
    const filteredIncidents = useMemo(() => {
        let list = [...incidents];
        const query = searchQuery.toLowerCase();

        if (searchQuery) {
            list = list.filter(
                (i) =>
                    i.title.toLowerCase().includes(query) ||
                    i.description.toLowerCase().includes(query)
            );
        }

        if (filter !== "All") {
            list = list.filter((i) => i.severity === filter);
        }

        list.sort((a, b) =>
            sort === "Newest"
                ? new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime()
                : new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime()
        );

        return list;
    }, [incidents, filter, sort, searchQuery]);

    const addIncident = useCallback(({ title, description, severity }: Omit<Incident, 'id' | 'reported_at'>) => {
        const newIncident: Incident = {
            id: Date.now(),
            title,
            description,
            severity,
            reported_at: new Date().toISOString(),
            expanded: false
        };
        setIncidents(prev => [newIncident, ...prev]);
        setCurrentPage(1);
        showToast("Incident reported successfully!"); // Show toast on add
    }, [showToast]);

    const deleteIncident = useCallback((id: number) => {
        setIncidents(prev => prev.filter(incident => incident.id !== id));
        setCurrentPage(1);
    }, []); // Removed showToast here, it will be called from IncidentCard

    const toggleExpand = useCallback((id: number) => {
        setIncidents(prev =>
            prev.map(i =>
                i.id === id ? { ...i, expanded: !i.expanded } : i
            )
        );
    }, []);

    const value = useMemo(() => ({
        incidents,
        filteredIncidents,
        addIncident,
        deleteIncident,
        toggleExpand,
        filter,
        setFilter,
        sort,
        setSort,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setExpanded,
        showToast, // Include showToast in the context value
    }), [
        incidents,
        addIncident,
        deleteIncident,
        toggleExpand,
        filter,
        sort,
        searchQuery,
        currentPage,
        itemsPerPage,
        setExpanded,
        filteredIncidents,
        showToast,
    ]);

    return (
        <IncidentContext.Provider value={value}>
            {children}
            <AnimatePresence>
                {toast && (
                    <Toast message={toast.message} success={toast.success} onClose={() => setToast(null)} />
                )}
            </AnimatePresence>
        </IncidentContext.Provider>
    );
};

export const useIncidents = () => {
    const context = useContext(IncidentContext);
    if (!context) {
        throw new Error('useIncidents must be used within an IncidentProvider');
    }
    return context;
};