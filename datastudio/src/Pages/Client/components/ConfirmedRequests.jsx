import React from 'react';
import { Skeleton } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';

// Fake JSON data for confirmed requests
const fakeRequests = [
  { _id: '1', title: 'Request 1', type: 'CM Report', status: 'Confirmed', AssignTo: 'Engineer 1' },
  { _id: '2', title: 'Request 2', type: 'PM Report', status: 'Confirmed', AssignTo: 'Engineer 2' },
  { _id: '3', title: 'Request 3', type: 'PPM Report', status: 'Confirmed', AssignTo: 'Engineer 3' },
  { _id: '4', title: 'Request 4', type: 'Regular', status: 'Confirmed', AssignTo: 'Engineer 4' },
  // Add more fake data as needed
];

const ConfirmedRequests = () => {
  const loading = false; // Simulating loading state (false for simplicity)
  const author = ""
  // Simulated function for sending a request (for demonstration purposes)
  const sendRequest = () => {
    toast.success('Request successfully sent!');
  };

  return (
    <div className="bg-gray-200 text-white h-screen px-6  flex flex-col items-center ">
        <table className="w-full mt-4 bg-white border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
            <th className="py-2 text-black  border-b border-gray-300">Request ID</th>
              <th className="py-2 mr-4 text-black border-b border-gray-300">Request Title</th>
              <th className="py-2 px-4 border-b text-black border-gray-300">Request Type</th>
              <th className="py-2 px-4 border-b text-black border-gray-300">Request Status</th>
              <th className="py-2 px-4 border-b text-black border-gray-300">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Using Skeleton for loading placeholders
              <>
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </>
            ) : (
              // Rendering fakeRequests data
              fakeRequests.map((request) => (
                <tr key={request._id} className="border-b border-gray-300">
                  <td className="py-2 px-4 text-black">{request._id}</td>
                  <td className="py-2 px-4 text-black">{request.title}</td>
                  <td className="py-2 px-4 text-black">{request.type}</td>
                  <td className="py-2 px-4 text-black">{request.status}</td>
                  <td className="py-2 px-4 text-black">{request.AssignTo}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      <Toaster />
    </div>
  );
};

// Skeleton component for table row loading placeholder
const TableRowSkeleton = () => (
  <tr className="border-b border-gray-300">
    <td className="py-2 px-4">
      <Skeleton />
    </td>
    <td className="py-2 px-4">
      <Skeleton />
    </td>
    <td className="py-2 px-4">
      <Skeleton />
    </td>
    <td className="py-2 px-4">
      <Skeleton />
    </td>
    <td className="py-2 px-4">
      <Skeleton />
    </td>
  </tr>
);

export default ConfirmedRequests;
