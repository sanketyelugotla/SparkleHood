import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IncidentFilter from "./components/IncidentFilter";
import IncidentList from "./components/IncidentList";
import StatsCards from "./components/StatsCards";
import IncidentForm from "./components/IncidentForm";
import Toast from "./components/Toast";
import { Severity } from "./types/incident";
import { useIncidents } from "./context/IncidentContext";
import IncidentTrendChart from "./components/IncidentTrendChart";

export default function App() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const buttonRef = useRef<HTMLButtonElement>(null);
	const formRef = useRef<HTMLDivElement>(null);
	const mainContentRef = useRef<HTMLDivElement>(null);
	const { addIncident } = useIncidents();

	useEffect(() => {
		const mainContentElement = mainContentRef.current;
		if (isFormOpen && mainContentElement) {
			mainContentElement.style.overflow = 'hidden';
			setTimeout(() => {
				formRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}, 50);
		} else if (mainContentElement) {
			mainContentElement.style.overflow = 'auto';
		}

		return () => {
			if (mainContentElement) {
				mainContentElement.style.overflow = 'auto';
			}
		};
	}, [isFormOpen]);

	const handleFormSubmit = (title: string, description: string, severity: Severity) => {
		addIncident({ title, description, severity });
		setToastMessage("Incident added successfully!");
		setShowToast(true);
		setTimeout(() => setShowToast(false), 3000);
		setIsFormOpen(false);
	};

	return (
		<div className="min-h-screen bg-[#050816] py-4 sm:py-8 px-4 sm:px-6" ref={mainContentRef}>
			<div className="max-w-6xl mx-auto">
				<AnimatePresence>
					{showToast && (
						<Toast message={toastMessage} onClose={() => setShowToast(false)} />
					)}
				</AnimatePresence>

				<motion.header
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="mb-8 sm:mb-12 text-center"
				>
					<h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600 mt-2">
						AI Safety Incident Dashboard
					</h1>
					<div className="mt-2 text-sm sm:text-lg text-sky-300 max-w-2xl mx-auto">
						<p>Track and report AI safety incidents with transparency</p>
					</div>
				</motion.header>

				<div className="max-w-6xl mx-auto">

					<StatsCards /> {/* Shows the severity summary cards */}

					<IncidentTrendChart /> {/* Shows the weekly trends */}

					{/* <IncidentFilter /> */}
					{/* <IncidentList /> */}
				</div>

				<AnimatePresence>
					{isFormOpen && (
						<motion.div
							ref={formRef}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="mb-6 overflow-hidden flex justify-center"
						>
							<IncidentForm onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
						</motion.div>
					)}
				</AnimatePresence>

				<div className="space-y-6">
					<IncidentFilter />
					<IncidentList />
				</div>

				<motion.button
					ref={buttonRef}
					onClick={() => setIsFormOpen(!isFormOpen)}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className="fixed bottom-8 right-8 z-30 flex items-center justify-center p-4 rounded-full bg-sky-600 text-white shadow-xl cursor-pointer"
					style={{ width: '64px', height: '64px' }}
					aria-label={isFormOpen ? "Close form" : "Report new incident"}
				>
					<motion.svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						animate={{ rotate: isFormOpen ? 90 : 0 }}
						transition={{ duration: 0.3 }}
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isFormOpen ? "M6 18L18 6M6 6l12 12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
					</motion.svg>
				</motion.button>
			</div>
		</div>
	);
}