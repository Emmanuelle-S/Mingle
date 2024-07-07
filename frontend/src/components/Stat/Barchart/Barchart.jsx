import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
    const chartData = {
        labels: ['Total Users', 'Total Messages', 'Active Users', 'New Registrations'],
        datasets: [
            {
                label: 'Statistiques',
                data: [data.totalUsers, data.totalMessages, data.activeUsers, data.newRegistrations],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default BarChart;
