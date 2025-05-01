import React, { createContext, useContext, useMemo, useState } from 'react';
import { Incident, Severity } from '../types/incident';
import { mockIncidents } from '../data/mockData';

type IncidentContextType = {
    incidents: Incident[];
    filteredIncidents: Incident[];
    addIncident: (incident: Omit<Incident, 'id' | 'reported_at'>) => void;
    filter: Severity | 'All';
    setFilter: (filter: Severity | 'All') => void;
    sort: 'Newest' | 'Oldest';
    setSort: (sort: 'Newest' | 'Oldest') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    toggleExpand: (id: number) => void;
    setExpanded: (id: number, expanded: boolean) => void;
};

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
    const [filter, setFilter] = useState<Severity | 'All'>("All");
    const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const toggleExpand = (id: number) => {
        setIncidents(prev =>
            prev.map(i =>
                i.id === id ? { ...i, expanded: !i.expanded } : i
            )
        );
    };

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

    return (
        <IncidentContext.Provider value={{
            incidents,
            filteredIncidents,
            addIncident,
            filter,
            setFilter,
            sort,
            setSort,
            searchQuery,
            setSearchQuery,
            currentPage,
            setCurrentPage,
            itemsPerPage,
            toggleExpand,
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