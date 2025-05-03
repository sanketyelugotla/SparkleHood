import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useIncidents } from '../context/IncidentContext';
import { Severity } from '../types/incident';

Chart.register(...registerables);

const IncidentTrendChart = () => {
    const { incidents } = useIncidents();

    // Group incidents by week and severity
    const weeklyData = incidents.reduce((acc, incident) => {
        const date = new Date(incident.reported_at);
        const year = date.getFullYear();
        const weekNum = getWeekNumber(date);
        const weekKey = `${year}-W${weekNum.toString().padStart(2, '0')}`;

        if (!acc[weekKey]) {
            acc[weekKey] = {
                Low: 0,
                Medium: 0,
                High: 0,
                startDate: getStartOfWeek(date)
            };
        }
        acc[weekKey][incident.severity]++;
        return acc;
    }, {} as Record<string, Record<Severity, number> & { startDate: Date }>);

    // Helper function to get week number
    function getWeekNumber(date: Date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
    }

    // Helper function to get start of week
    function getStartOfWeek(date: Date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.setDate(diff));
    }

    // Sort weeks chronologically
    const sortedWeeks = Object.keys(weeklyData).sort((a, b) =>
        new Date(weeklyData[a].startDate).getTime() - new Date(weeklyData[b].startDate).getTime()
    );

    // Format labels as "Week of [date]"
    const labels = sortedWeeks.map(week => {
        const startDate = weeklyData[week].startDate;
        return `${startDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}`;
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Low Severity',
                data: sortedWeeks.map(week => weeklyData[week].Low),
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                borderWidth: 2
            },
            {
                label: 'Medium Severity',
                data: sortedWeeks.map(week => weeklyData[week].Medium),
                borderColor: 'rgb(245, 158, 11)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.3,
                borderWidth: 2
            },
            {
                label: 'High Severity',
                data: sortedWeeks.map(week => weeklyData[week].High),
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.3,
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false
        },
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#E5E7EB',
                    font: {
                        size: 12
                    },
                    padding: 20 // Add padding between legend and chart
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        return ` ${label}: ${value} incident${value !== 1 ? 's' : ''}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawTicks: false // Optional: removes ticks between labels
                },
                ticks: {
                    color: '#9CA3AF',
                    padding: 10 // This adds padding below the labels
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#9CA3AF',
                    precision: 0,
                    padding: 5 // Adds padding to the left of y-axis labels
                }
            }
        },
        layout: {
            padding: {
                top: 20, // Adds padding at the top of the chart
                bottom: 20 // Adds padding at the bottom (above x-axis labels)
            }
        },
        maintainAspectRatio: false
    };
    
    return (
        <div className="bg-[#0a1026] rounded-xl shadow-sm border border-sky-900 p-4 sm:p-6 mt-6 h-96 mb-[3rem]">
            <h3 className="text-lg font-semibold text-sky-300 mb-4">Weekly Incident Trends</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default IncidentTrendChart;