import React from 'react';
import { Pie } from 'react-chartjs-2';

const Piechart = ({ data }) => {
    const chartData = {
        labels: ['Services Publiés', 'Personnes intéressées', 'Interactions'],
        datasets: [
            {
                label: 'Statistiques',
                data: [data.publishedServices, data.interestedUsers, data.interactions],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default Piechart;
