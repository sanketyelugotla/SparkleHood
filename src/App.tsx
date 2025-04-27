import { useState, useMemo, useRef, useEffect } from "react";
import { Incident, Severity } from "./types/incident";
import { mockIncidents } from "./data/mockData";
import IncidentFilter from "./components/IncidentFilter";
import IncidentList from "./components/IncidentList";
import IncidentForm from "./components/IncidentForm";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
	const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
	const [filter, setFilter] = useState<Severity | "All">("All");
	const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");
	const [searchQuery, setSearchQuery] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [originPosition, setOriginPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
	const buttonRef = useRef<HTMLButtonElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const filteredSortedIncidents = useMemo(() => {
		let list = [...incidents];
		const query = searchQuery.toLowerCase();

		if (searchQuery) {
			list = list.filter(
				(i) =>
					i.title.toLowerCase().includes(query) ||
					i.description.toLowerCase().includes(query)
			);

			// Auto-expand incidents with matches in description
			list = list.map(i => {
				if (i.description.toLowerCase().includes(query)) {
					return { ...i, expanded: true };
				}
				return i;
			});
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
			expanded: false
		};
		setIncidents((prev) => [newIncident, ...prev]);
		setShowForm(false);
	};

	const handleOpenForm = () => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setOriginPosition({
				top: rect.top + window.scrollY,
				left: rect.left + window.scrollX,
				width: rect.width,
				height: rect.height
			});
		}
		setShowForm(true);
		document.body.style.overflow = 'hidden';
	};

	const handleCloseForm = () => {
		setShowForm(false);
		document.body.style.overflow = 'auto';
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (showForm && modalRef.current && !modalRef.current.contains(event.target as Node)) {
				handleCloseForm();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showForm]);

	useEffect(() => {
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-4 sm:px-6">
			<div className="max-w-6xl mx-auto">
				<motion.header
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="mb-8 sm:mb-12 text-center"
				>
					<h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
						AI Safety&nbsp;
						<br className="block sm:hidden" />
						Incident Dashboard
					</h1>
					<p className="mt-2 text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
						Track and report AI safety incidents with transparency
					</p>
				</motion.header>

				<div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6">
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
							<div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
								<h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
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
								<span className="text-sm text-gray-500">
									Showing {filteredSortedIncidents.length} of {incidents.length}
								</span>
							</div>
							<IncidentList
								incidents={filteredSortedIncidents}
								onToggleExpand={toggleExpand}
								searchQuery={searchQuery}
							/>
						</div>
					</div>

					{/* Desktop Form */}
					<div className="hidden lg:block lg:col-span-1">
						<IncidentForm onSubmit={handleSubmit} />
					</div>
				</div>

				{/* Mobile Floating Action Button */}
				<motion.button
					ref={buttonRef}
					onClick={handleOpenForm}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className="lg:hidden fixed bottom-8 right-8 z-30 flex items-center justify-center p-4 rounded-full bg-indigo-600 text-white shadow-xl cursor-pointer"
					style={{ width: '64px', height: '64px' }}
					aria-label="Report new incident"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
				</motion.button>

				{/* Mobile Form Overlay */}
				<AnimatePresence>
					{showForm && (
						<>
							<motion.div
								className="fixed inset-0 bg-black/30 z-40 lg:hidden"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
							/>

							<div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden">
								<motion.div
									ref={modalRef}
									className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
									initial={{
										clipPath: `circle(0% at ${originPosition.left + originPosition.width / 2}px ${originPosition.top + originPosition.height / 2}px)`,
										opacity: 0,
										scale: 0.5
									}}
									animate={{
										clipPath: "circle(150% at 50% 50%)",
										opacity: 1,
										scale: 1,
										transition: {
											duration: 0.6,
											ease: [0.22, 1, 0.36, 1]
										}
									}}
									exit={{
										clipPath: `circle(0% at ${originPosition.left + originPosition.width / 2}px ${originPosition.top + originPosition.height / 2}px)`,
										opacity: 0,
										scale: 0.8,
										transition: {
											duration: 0.4,
											ease: [0.22, 1, 0.36, 1]
										}
									}}
								>
									<IncidentForm
										onSubmit={(title, desc, severity) => {
											handleSubmit(title, desc, severity);
											handleCloseForm();
										}}
										onCancel={handleCloseForm}
									/>
								</motion.div>
							</div>
						</>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}