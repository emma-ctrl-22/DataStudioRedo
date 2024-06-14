import React from 'react';
import { Chart } from 'primereact/chart';

const StackedChart = () => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Pmreport',
        backgroundColor: '#42A5F5',
        data: [65, 59, 80, 81, 56, 61, 86]
      },
      {
        label: 'PPMReport',
        backgroundColor: '#66BB6A',
        data: [28, 48, 40, 19, 86, 34, 23]
      },
      {
        label: 'CMReport',
        backgroundColor: '#EF5350',
        data: [45, 25, 16, 36, 67, 81, 29]
      }
    ]
  };

  const options = {
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Don't maintain aspect ratio
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top', // Position legend at the top
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Disable x-axis grid lines
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Enable y-axis grid lines
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 4, // Rounded corners for bars
      },
    },
  };

  return (
    <div className="p-4">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default StackedChart;
