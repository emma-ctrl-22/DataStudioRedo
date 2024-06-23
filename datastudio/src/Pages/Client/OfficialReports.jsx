import React, { useState, useEffect,useContext } from 'react';
import { Skeleton, Modal } from '@mui/material';
import axios from 'axios';
import { OfficialReportModal } from './components';
import { AuthContext } from '../../Context/AuthContext';

const OfficialReports = () => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [createdreports, setCreatedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const name = userInfo.username 
  console.log(name)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/client/getofficialreports?name=${encodeURIComponent(name)}`);
        console.log('API Response:', response.data); // Log API response
        if (response.data.status === "ok") {
          setCreatedReports(response.data.data); // Update state with data array
        } else {
          console.error('API returned error status:', response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching official reports:', error);
        setLoading(false);
      }
    };

    fetchReports();
  }, [name]);

  const openModal = (report) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className="relative p-5 bg-gray-900">
      <div className="mt-3 mb-3 rounded-md">
        <h1 className="text-md text-left text-blue-500 ">
          <span className="bg-blue-100 p-1 rounded-md">Official Reports</span>
        </h1>
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
              <tr className="w-full bg-blue-500 text-gray-600 text-left text-sm uppercase font-semibold tracking-wider">
                <th className="px-6 py-3 border-b">Report ID</th>
                <th className="px-6 py-3 border-b">Facility Name</th>
                <th className="px-6 py-3 border-b">Serial Number</th>
                <th className="px-6 py-3 border-b">Equipment Name</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light bg-blue-200">
              {createdreports.map((report) => (
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
            <OfficialReportModal report={selectedReport} onClose={closeModal} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OfficialReports;
