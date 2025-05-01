import React, { createContext, useContext, useState, useMemo } from 'react';
import { Incident, Severity } from '../types/incident';
import { mockIncidents } from '../data/mockData';

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
};


const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
    const [filter, setFilter] = useState<Severity | "All">("All");
    const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const setExpanded = (id: number, expanded: boolean) => {
        setIncidents(prev =>
            prev.map(i =>
                i.id === id ? { ...i, expanded } : i
            )
        );
    };

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

    const addIncident = ({ title, description, severity }: Omit<Incident, 'id' | 'reported_at'>) => {
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
    };

    const deleteIncident = (id: number) => {
        setIncidents(prev => prev.filter(incident => incident.id !== id));
        setCurrentPage(1);
    };

    const toggleExpand = (id: number) => {
        setIncidents(prev =>
            prev.map(i =>
                i.id === id ? { ...i, expanded: !i.expanded } : i
            )
        );
    };

    return (
        <IncidentContext.Provider value={{
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
            setExpanded
        }}>
            {children}
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