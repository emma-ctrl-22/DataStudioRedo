import React from 'react';
import { Chart } from 'primereact/chart';

const DoughnutChart = ({ values, title, onClick }) => {
  const data = {
    labels: ['PM Report', 'CM Report', 'PPM Report',"regular"], // Example labels
    datasets: [
      {
        data: values || [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#EF5350',"#c0c0c0"], // Example background colors
        hoverBackgroundColor: ['#64B5F6', '#81C784', '#E57373','#c0c0c0'], // Example hover colors
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
    <div onClick={onClick} className="p-0">
      <h2 className="text-sm font-semibold absolute z-10 mr-8">{title}</h2>
      <Chart type="doughnut" data={data} options={options} style={{ maxWidth: '100%' }} />
    </div>
  );
};

export default DoughnutChart;
