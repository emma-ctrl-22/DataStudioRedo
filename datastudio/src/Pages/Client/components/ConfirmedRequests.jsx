import React, { useState, useEffect,useContext } from 'react';
import { Skeleton } from '@mui/material';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContext';

const ConfirmedRequests = () => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const author = userInfo.email;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true); // Set loading state to true before making the request
        const response = await axios.get(`http://localhost:8080/api/client/requests-by-author?author=${encodeURIComponent(author)}`);
        console.log('API Response:', response.data); // Log API response to debug

        if (Array.isArray(response.data)) {
          // Filter requests with status 'done'
          const filteredRequests = response.data.filter(request => request.status === 'done');
          setRequests(filteredRequests); // Update state with filtered requests
        } else {
          console.error('Invalid data format received from API:', response.data);
          toast.error('Failed to fetch requests. Please try again later.');
        }

        setLoading(false); // Set loading state to false after receiving response
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast.error('Failed to fetch requests. Please try again later.');
        setLoading(false); // Ensure loading state is false on error
      }
    };

    fetchRequests();
  }, [author]);

  return (
    <div className="bg-gray-900 text-black h-screen px-6 flex flex-col items-center">
      <table className="w-full mt-4 bg-white border border-gray-400">
        <thead>
          <tr className="bg-blue-500">
            <th className="py-2 text-white border-b border-gray-300">Request ID</th>
            <th className="py-2 mr-4 text-white border-b border-gray-300">Request Title</th>
            <th className="py-2 px-4 border-b text-white border-gray-300">Request Type</th>
            <th className="py-2 px-4 border-b text-white border-gray-300">Request Status</th>
            <th className="py-2 px-4 border-b text-white border-gray-300">Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Render Skeleton components while loading
            <>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </>
          ) : (
            // Render actual data from filtered requests array
            requests.map((request) => (
              <tr key={request._id} className="border-b bg-blue-300 border-gray-300">
                <td className="py-2 px-4 text-white">{request._id}</td>
                <td className="py-2 px-4 text-white">{request.title}</td>
                <td className="py-2 px-4 text-white">{request.type}</td>
                <td className="py-2 px-4 text-white">{request.status}</td>
                <td className="py-2 px-4 text-white">{request.AssignTo}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Toaster /> {/* Toast component for showing error messages */}
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
