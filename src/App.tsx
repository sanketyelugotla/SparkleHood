import { useState, useMemo } from "react";
import { Incident, Severity } from "./types/incident";
import { mockIncidents } from "./data/mockData";
import IncidentFilter from "./components/IncidentFilter";
import IncidentList from "./components/IncidentLis";
import IncidentForm from "./components/IncidentForm";

export default function App() {
	const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
	const [filter, setFilter] = useState<Severity | "All">("All");
	const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredSortedIncidents = useMemo(() => {
		let list = [...incidents];

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
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

	const toggleExpand = (id: number) => {
		setIncidents((prev) =>
			prev.map((i) =>
				i.id === id ? { ...i, expanded: !i.expanded } : i
			)
		);
	};

	const handleSubmit = (title: string, description: string, severity: Severity) => {
		const newIncident: Incident = {
			id: Date.now(),
			title,
			description,
			severity,
			reported_at: new Date().toISOString(),
		};
		setIncidents((prev) => [newIncident, ...prev]);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
			<div className="max-w-6xl mx-auto">
				<header className="mb-12 text-center">
					<h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
						AI Safety Incident Dashboard
					</h1>
					<p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
						Track and report AI safety incidents with transparency
					</p>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<IncidentFilter
							filter={filter}
							setFilter={setFilter}
							sort={sort}
							setSort={setSort}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>

						<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
							<div className="p-6 border-b border-gray-200">
								<h2 className="text-xl font-semibold text-gray-800 flex items-center">
									<svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									Incident Reports
									{searchQuery && (
										<span className="ml-2 text-sm font-normal text-gray-500">
											(Search: "{searchQuery}")
										</span>
									)}
								</h2>
							</div>
							<IncidentList
								incidents={filteredSortedIncidents}
								onToggleExpand={toggleExpand}
							/>
						</div>
					</div>

					<div className="lg:col-span-1">
						<IncidentForm onSubmit={handleSubmit} />
					</div>
				</div>
			</div>
		</div>
	);
}