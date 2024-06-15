import React from 'react';
import { Skeleton } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';

const fakeRequests = [
  { _id: '1', title: 'Mr.Prah', type: 'CM Report', status: 'Pending', AssignTo: 'Engineer 1' },
  { _id: '2', title: 'Mamometer', type: 'PM Report', status: 'Pending', AssignTo: 'Engineer 2' },
  { _id: '3', title: 'AutoClave', type: 'PPM Report', status: 'Pending', AssignTo: 'Engineer 3' },
  { _id: '4', title: 'Bulb', type: 'Regular', status: 'Pending', AssignTo: 'Engineer 4' },
  { _id: '5', title: 'AutoClave', type: 'PPM Report', status: 'Pending', AssignTo: 'Engineer 3' },
  { _id: '6', title: 'Bulb', type: 'Regular', status: 'Pending', AssignTo: 'Engineer 4' },{ _id: '3', title: 'AutoClave', type: 'PPM Report', status: 'Pending', AssignTo: 'Engineer 3' },
  { _id: '7', title: 'Bulb', type: 'Regular', status: 'Pending', AssignTo: 'Engineer 4' },
  { _id: '8', title: 'AutoClave', type: 'PPM Report', status: 'Pending', AssignTo: 'Engineer 3' },
  { _id: '9', title: 'Bulb', type: 'Regular', status: 'Pending', AssignTo: 'Engineer 4' },
  { _id: '10', title: 'AutoClave', type: 'PPM Report', status: 'Pending', AssignTo: 'Engineer 3' },
  { _id: '11', title: 'Bulb', type: 'Regular', status: 'Pending', AssignTo: 'Engineer 4' },
];

const PendingRequests = () => {
  const loading = false; 

  const sendRequest = () => {
    toast.success('Request successfully sent!');
  };

  return (
    <div className="bg-gray-200 text-white h-screen px-6  flex flex-col items-center ">
        <table className="w-full mt-4 bg-white border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 text-black  border-b border-gray-300">Report ID</th>
              <th className="py-2 mr-4 text-black border-b border-gray-300">Report Title</th>
              <th className="py-2 px-4 border-b text-black border-gray-300">Report Type</th>
              <th className="py-2 px-4 border-b text-black border-gray-300">Report Status</th>
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
                  <td className="py-2 px-2 text-black">{request.title}</td>
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
  )
};

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

export default PendingRequests