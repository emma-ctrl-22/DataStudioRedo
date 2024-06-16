import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { ReportModal } from './components';

const AllReports = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/get-all-reports');
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setLoading(false); // Set loading to false even on error to stop the skeleton loaders
    }
  };

  const openModal = (report) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className="p-6">
      <div className="m-3 rounded-md">
        <h1 className="text-md text-left text-red-500">
          <span className="bg-red-100 p-1 rounded-md">All Reports</span>
        </h1>
      </div>
      {loading ? (
        <>
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
        </>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Engineer</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Facility Name</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Serial Number</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Type</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Equipment Name</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="even:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-300">{report.Engineer}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{report.FacilityName}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{report.SerialNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{report.type}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{report.EquipmentName}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button className="bg-red-500 p-1 rounded-md text-white text-sm" onClick={() => openModal(report)}>View Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedReport && <ReportModal report={selectedReport} onClose={closeModal} />}
        </>
      )}
    </div>
  );
};

export default AllReports;
