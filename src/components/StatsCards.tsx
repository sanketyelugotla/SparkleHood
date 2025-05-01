import { useIncidents } from '../context/IncidentContext';
import { motion } from 'framer-motion';

const StatsCards = () => {
    const { incidents } = useIncidents();

    const stats = {
        total: incidents.length,
        high: incidents.filter(i => i.severity === 'High').length,
        medium: incidents.filter(i => i.severity === 'Medium').length,
        low: incidents.filter(i => i.severity === 'Low').length,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#050816] border border-sky-900 rounded-xl p-4 shadow-lg"
            >
                <h3 className="text-sky-400 text-sm font-medium">Total Incidents</h3>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#050816] border border-red-900 rounded-xl p-4 shadow-lg"
            >
                <h3 className="text-red-400 text-sm font-medium">High Severity</h3>
                <p className="text-2xl font-bold text-white">{stats.high}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#050816] border border-amber-900 rounded-xl p-4 shadow-lg"
            >
                <h3 className="text-amber-400 text-sm font-medium">Medium Severity</h3>
                <p className="text-2xl font-bold text-white">{stats.medium}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#050816] border border-emerald-900 rounded-xl p-4 shadow-lg"
            >
                <h3 className="text-emerald-400 text-sm font-medium">Low Severity</h3>
                <p className="text-2xl font-bold text-white">{stats.low}</p>
            </motion.div>
        </div>
    );
};

export default StatsCards;