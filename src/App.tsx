import { IncidentProvider } from './context/IncidentContext';
import IncidentFilter from './components/IncidentFilter';
import IncidentList from './components/IncidentList';
import StatsCards from './components/StatsCards';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef } from 'react';
import IncidentForm from './components/IncidentForm';

export default function App() {
	const [showForm, setShowForm] = useState(false);
	const [originPosition, setOriginPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
	const buttonRef = useRef<HTMLButtonElement>(null);

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

	return (
		<IncidentProvider>
			<div className="min-h-screen bg-[#050816] py-4 sm:py-8 px-4 sm:px-6">
				<div className="max-w-6xl mx-auto">
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

					<StatsCards />

					<div className="space-y-6">
						<IncidentFilter />
						<IncidentList />
					</div>

					{/* Floating Action Button */}
					<motion.button
						ref={buttonRef}
						onClick={handleOpenForm}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className="fixed bottom-8 right-8 z-30 flex items-center justify-center p-4 rounded-full bg-sky-600 text-white shadow-xl cursor-pointer"
						style={{ width: '64px', height: '64px' }}
						aria-label="Report new incident"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
						</svg>
					</motion.button>

					{/* Form Modal */}
					<AnimatePresence>
						{showForm && (
							<>
								<motion.div
									className="fixed inset-0 bg-black/70 z-40"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
								/>

								<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
									<motion.div
										className="w-full max-w-md bg-[#050816] rounded-2xl shadow-xl overflow-hidden border border-sky-800"
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
										<IncidentForm onCancel={handleCloseForm} />
									</motion.div>
								</div>
							</>
						)}
					</AnimatePresence>
				</div>
			</div>
		</IncidentProvider>
	);
}