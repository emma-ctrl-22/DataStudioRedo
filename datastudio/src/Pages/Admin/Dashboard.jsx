import React, { useState } from "react";
import { Card, DoughnutChart, StackedChart } from "./components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);

  const ReportValues = [100, 234, 321];
  const RequestValues = [90, 120, 180];

  const handleChartClick = (chartType) => {
    setSelectedChart(chartType);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedChart(null);
  };

  return (
    <div className="w-full h-full mx-0 px-4 py-0 bg-gray-100 overflow-y-auto custom-scrollbar">
      <div className="mt-5 mx-3 rounded-md">
        <h1 className="text-md text-left text-red-500 ">
          <span className="bg-red-100 p-1 rounded-md">Dashboard</span>
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
        <Card title="Total Users" value="150" onClick={() => handleChartClick('Card')} />
        <Card title="Total Reports" value="100" onClick={() => handleChartClick('Card')} />
        <Card title="Total Active Users" value="50" onClick={() => handleChartClick('Card')} />
        <Card title="Total Users" value="150" onClick={() => handleChartClick('Card')} />
        <Card title="Total Reports" value="100" onClick={() => handleChartClick('Card')} />
        <Card title="Total Active Users" value="50" onClick={() => handleChartClick('Card')} />
      </div>
      <div onClick={() => handleChartClick('StackedChart')} className="bg-white rounded-md border border-gray-500 w-full h-80 mb-4">
        <StackedChart  />
      </div>
      <div className="bg-white rounded-md border py-4 border-gray-500 w-full h-80 mb-4 flex flex-row justify-around">
        <DoughnutChart title="Annual Reports" values={ReportValues} onClick={() => handleChartClick('DoughnutChart')} />
        <DoughnutChart title="Annual Requests" values={RequestValues} onClick={() => handleChartClick('DoughnutChart')} />
      </div>

      {/* Modal for displaying selected chart */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", maxWidth: 600, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            {selectedChart === 'Card' && 'Card Details'}
            {selectedChart === 'StackedChart' && 'Stacked Chart'}
            {selectedChart === 'DoughnutChart' && 'Doughnut Chart'}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8, color: "primary.main" }}
          >
            <CloseIcon />
          </IconButton>
          {selectedChart === 'Card' && (
            <Card title="Sample Card" value="100" />
          )}
          {selectedChart === 'StackedChart' && (
            <StackedChart />
          )}
          {selectedChart === 'DoughnutChart' && (
            <DoughnutChart title="Sample Doughnut" values={[100, 200, 300]} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
