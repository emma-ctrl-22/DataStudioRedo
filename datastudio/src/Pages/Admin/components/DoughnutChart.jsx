import React from 'react';
import { Chart } from 'primereact/chart';

const DoughnutChart = ({ values, title }) => {
  const data = {
    labels: ['PM Report', 'CM Report', 'PPM Report'], // Example labels
    datasets: [
      {
        data: values || [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#EF5350'], // Example background colors
        hoverBackgroundColor: ['#64B5F6', '#81C784', '#E57373'], // Example hover colors
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true, // Use point style for legend
        },
      },
    },
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Allow chart to change aspect ratio
  };

  return (
    <div className="p-0">
      <h2 className="text-sm font-semibold absolute z-10">{title}</h2>
      <Chart type="doughnut" data={data} options={options} style={{ maxWidth: '100%' }} />
    </div>
  );
};

export default DoughnutChart;
