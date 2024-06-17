import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, DoughnutChart, StackedChart } from "./components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import chartIcon from "../../assets/chart.svg";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [data, setData] = useState({
    totalReports: 0,
    totalRequests: 0,
    dailyReports: 0,
    completedRequests: 0,
    uncompletedRequests: 0,
  });
  const [annualReportData, setAnnualReportData] = useState({
    PMReport: 0,
    PPMReport: 0,
    CMReport: 0,
    regular: 0,
  });
  const [annualRequestData, setAnnualRequestData] = useState({
    PMReport: 0,
    PPMReport: 0,
    CMReport: 0,
    regular: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalsResponse = await axios.get('http://localhost:8080/api/admin/totals');
        setData(totalsResponse.data);

        const annualReportsResponse = await axios.get('http://localhost:8080/api/admin/annual-reports');
        setAnnualReportData(annualReportsResponse.data);

        const annualRequestsResponse = await axios.get('http://localhost:8080/api/admin/annual-reports');
        setAnnualRequestData(annualRequestsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChartClick = (chartType) => {
    setSelectedChart(chartType);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedChart(null);
  };

  return (
    <div style={{fontFamily:"Montserrat"}} className="w-full h-full mx-0 px-4 py-0 bg-gray-100 overflow-y-auto custom-scrollbar">
      <div className="mt-5 mx-3 rounded-md">
        <h1 className="text-md text-left text-red-500 ">
          <span className="bg-red-100 p-1 rounded-md">Dashboard</span>
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
        <Card title="Total Reports" data={data.totalReports} icon={chartIcon} iconBgColor="bg-green-100" onClick={() => handleChartClick('Card')} />
        <Card title="Total Requests" data={data.totalRequests} icon={chartIcon} iconBgColor="bg-green-100" onClick={() => handleChartClick('Card2')} />
        <Card title="Daily Reports" data={data.dailyReports} icon={chartIcon} iconBgColor="bg-green-100" onClick={() => handleChartClick('Card3')} />
        <Card title="Completed Requests" data={data.completedRequests} icon={chartIcon} iconBgColor="bg-green-100" onClick={() => handleChartClick('Card4')} />
        <Card title="Uncompleted Requests" data={data.uncompletedRequests} icon={chartIcon} iconBgColor="bg-green-100" onClick={() => handleChartClick('Card5')} />
      </div>
      <div onClick={() => handleChartClick('StackedChart')} className="bg-white rounded-md border border-gray-500 w-full h-80 mb-4">
        <StackedChart />
      </div>
      <div className="bg-white rounded-md border py-4 border-gray-500 w-full h-80 mb-4 flex flex-row justify-around">
        <DoughnutChart 
          title="Annual Reports" 
          values={[annualReportData.PMReport, annualReportData.PPMReport, annualReportData.CMReport, annualReportData.regular]} 
          onClick={() => handleChartClick('DoughnutChart')} 
        />
        <DoughnutChart 
          title="Annual Requests" 
          values={[annualRequestData.PMReport, annualRequestData.PPMReport, annualRequestData.CMReport, annualRequestData.regular]} 
          onClick={() => handleChartClick('DoughnutChart')} 
        />
      </div>

      {/* Modal for displaying selected chart */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", maxWidth: 600, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            {selectedChart === 'Card' && 'Card Details'}
            {selectedChart === 'StackedChart' && 'Stacked Chart'}
            {selectedChart === 'DoughnutChart' && 'Doughnut Chart'}
          </Typography>
          <IconButton aria-label="close" onClick={handleCloseModal} sx={{ position: "absolute", right: 8, top: 8, color: "primary.main" }}>
            <CloseIcon />
          </IconButton>
          {selectedChart === 'Card' && <Card title="Total Reports" data={data.totalReports} icon={chartIcon} iconBgColor="bg-green-100" />}
          {selectedChart === 'Card2' && <Card title="Total Requests" data={data.totalRequests} icon={chartIcon} iconBgColor="bg-green-100"/>}
          {selectedChart === 'Card3' && <Card title="Daily Reports" data={data.dailyReports} icon={chartIcon} iconBgColor="bg-green-100" />}
          {selectedChart === 'Card4' && <Card title="Completed Requests" data={data.completedRequests} icon={chartIcon} iconBgColor="bg-green-100" />}
          {selectedChart === 'Card5' && <Card title="UnCompleted Requests" data={data.uncompletedRequests} icon={chartIcon} iconBgColor="bg-green-100" />}
          {selectedChart === 'StackedChart' && <StackedChart />}
          {selectedChart === 'DoughnutChart' && <DoughnutChart title="Sample Doughnut" values={[100, 200, 300]} />}
        </Box>
      </Modal>
      <Toaster />
    </div>
  );
};

export default Dashboard;
