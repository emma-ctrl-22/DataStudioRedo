import React, { useState, useEffect } from 'react';
import { Skeleton, Modal } from '@mui/material';
import { ReportModal } from './components';

// Fake JSON data for simulation
const fakeReports = [
  { _id: '1', FacilityName: 'Facility 1', SerialNumber: 'SN001', EquipmentName: 'Equipment 1' },
  { _id: '2', FacilityName: 'Facility 2', SerialNumber: 'SN002', EquipmentName: 'Equipment 2' },
  { _id: '3', FacilityName: 'Facility 3', SerialNumber: 'SN003', EquipmentName: 'Equipment 3' },
  { _id: '4', FacilityName: 'Facility 3', SerialNumber: 'SN004', EquipmentName: 'Equipment 4' },
  { _id: '5', FacilityName: 'Facility 3', SerialNumber: 'SN005', EquipmentName: 'Equipment 5' },
  { _id: '6', FacilityName: 'Facility 3', SerialNumber: 'SN006', EquipmentName: 'Equipment 6' },
  { _id: '7', FacilityName: 'Facility 3', SerialNumber: 'SN007', EquipmentName: 'Equipment 7' },
  { _id: '8', FacilityName: 'Facility 3', SerialNumber: 'SN008', EquipmentName: 'Equipment 8' },
  { _id: '9', FacilityName: 'Facility 3', SerialNumber: 'SN009', EquipmentName: 'Equipment 9' },
  // Add more fake data as needed
];

const ReportHistory = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setReports(fakeReports);
      setLoading(false);
    }, 2000);
  }, []);

  const openModal = (report) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.EquipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.SerialNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative p-5">
      <div className="mt-3 mb-3 rounded-md">
        <h1 className="text-md text-left text-red-500 ">
          <span className="bg-red-100 p-1 rounded-md">Report History</span>
        </h1>
      </div>
      <div className="w-1/3 h-10 mb-6">
        <input
          type="text"
          placeholder="Search by equipment name or serial number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full border border-gray-300 outline-none pl-2 font-inter text-xl rounded-md"
        />
      </div>
      {loading ? (
        <div className="mt-4">
          <Skeleton variant="text" width="90%" height={40} className="mb-5" />
          <Skeleton variant="rectangular" width="90%" height={40} className="mb-5" />
          <Skeleton variant="rectangular" width="90%" height={40} className="mb-5" />
        </div>
      ) : (
        <div className="mt-10">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 text-left text-sm uppercase font-semibold tracking-wider">
                <th className="px-6 py-3 border-b">Report ID</th>
                <th className="px-6 py-3 border-b">Facility Name</th>
                <th className="px-6 py-3 border-b">Serial Number</th>
                <th className="px-6 py-3 border-b">Equipment Name</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredReports.map((report) => (
                <tr className="border-b" key={report._id}>
                  <td className="px-6 py-1 border-r">{report._id}</td>
                  <td className="px-6 py-1 border-r">{report.FacilityName}</td>
                  <td className="px-6 py-1 border-r">{report.SerialNumber}</td>
                  <td className="px-6 py-1 border-r">{report.EquipmentName}</td>
                  <td className="px-6 py-1">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => openModal(report)}
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedReport && (
        <Modal open={Boolean(selectedReport)} onClose={closeModal}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <ReportModal report={selectedReport} onClose={closeModal} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReportHistory;
