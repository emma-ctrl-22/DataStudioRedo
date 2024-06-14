import React from "react";
import Card from "./components/Card"; // Adjust the import path if necessary

const Dashboard = () => {
  return (
    <div className="w-full h-full mx-0 px-0 py-0 bg-gray-100">
      <div className="grid grid-cols-3 gap-4 p-4">
        <Card title="Total Users" value="150" />
        <Card title="Total Reports" value="100" />
        <Card title="Total Active Users" value="50" />
        <Card title="Total Users" value="150" />
        <Card title="Total Reports" value="100" />
        <Card title="Total Active Users" value="50" />
      </div>
    </div>
  );
};

export default Dashboard;
