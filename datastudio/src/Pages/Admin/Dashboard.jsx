import React from "react";
import { Card, DoughnutChart, StackedChart } from "./components"; // Adjust the import path if necessary

const Dashboard = () => {
  const ReportValues = [100, 234, 321]; 
  const RequestValues = [90, 120, 180];
  return (
    <div className="w-full h-full mx-0 px-4 py-0 bg-gray-100 overflow-y-auto custom-scrollbar">
      <div className="mt-5 mx-3 rounded-md">
        <h1 className="text-md text-left text-red-500 ">
          <span className="bg-red-100 p-1 rounded-md">Dashboard</span>
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
        <Card title="Total Users" value="150" />
        <Card title="Total Reports" value="100" />
        <Card title="Total Active Users" value="50" />
        <Card title="Total Users" value="150" />
        <Card title="Total Reports" value="100" />
        <Card title="Total Active Users" value="50" />
      </div>
      <div className="bg-white rounded-md border border-gray-500 w-full h-80 mb-4">
        <StackedChart />
      </div>
      <div className="bg-white rounded-md border py-4 border-gray-500 w-full h-80 mb-4 flex flex-row justify-around">
        <DoughnutChart title="Annual Reports" values={ReportValues} />
        <DoughnutChart title="Annual Requests" values={RequestValues} />
      </div>
    </div>
  );
};

export default Dashboard;
