import React from 'react';
import { Button } from '@mui/material';

const ReportModal = ({ report, onClose }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Report Details</h2>
    <div className="mb-4">
      <p className="font-semibold">ID:</p>
      <p>{report._id}</p>
    </div>
    <div className="mb-4">
      <p className="font-semibold">Facility Name:</p>
      <p>{report.FacilityName}</p>
    </div>
    <div className="mb-4">
      <p className="font-semibold">Serial Number:</p>
      <p>{report.SerialNumber}</p>
    </div>
    <div className="mb-4">
      <p className="font-semibold">Equipment Name:</p>
      <p>{report.EquipmentName}</p>
    </div>
    <div className="flex justify-end">
      <Button variant="contained" color="secondary" onClick={onClose}>
        Close
      </Button>
    </div>
  </div>
);

export default ReportModal;
