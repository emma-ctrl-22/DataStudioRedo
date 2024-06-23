import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AllRequests = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [selectedAssignments, setSelectedAssignments] = useState({});

  useEffect(() => {

    fetchRequestsAndEngineers();
  }, []);
  const fetchRequestsAndEngineers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/requests-and-engineers');
      const { requests, engineers } = response.data;
      setRequests(requests);
      setEngineers(engineers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    }
  };

  const handleEngineerChange = (requestId, engineerUsername) => {
    setSelectedAssignments((prev) => ({
      ...prev,
      [requestId]: engineerUsername,
    }));
  };

  const assignRequest = async (requestId) => {
    const engineerUsername = selectedAssignments[requestId];

    if (!engineerUsername) {
      toast.error('Please select an engineer');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/admin/assign-request', {
        engineerUsername,
        requestId,
      });
      console.log('Response:', response.data);

      toast.success('Request assigned successfully');
      fetchRequestsAndEngineers();
    } catch (error) {
      console.error('Error assigning request:', error);
      toast.error('Error assigning request');
    }
  };

  return (
    <div style={{fontFamily:"Montserrat"}} className="px-6">
      <div className="mt-3 mx-1 rounded-md">
        <h1 className="text-md text-left text-blue-500 mb-3">
          <span className="bg-blue-100 p-1 rounded-md">All Requests</span>
        </h1>
      </div>
      {loading ? (
        <Box>
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
      ) : (
        <table className="w-full bg-blue-200 border border-gray-300 rounded-lg mt-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b bg-blue-300 border-gray-300 text-left">Title</th>
              <th className="py-2 px-4 border-b bg-blue-300 border-gray-300 text-left">Type</th>
              <th className="py-2 px-4 border-b bg-blue-300 border-gray-300 text-left">Author</th>
              <th className="py-2 px-4 border-b bg-blue-300 border-gray-300 text-left">Assign To</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="even:bg-blue-400">
                <td className="py-2 px-4 border-b border-gray-300">{request.title}</td>
                <td className="py-2 px-4 border-b border-gray-300">{request.type}</td>
                <td className="py-2 px-4 border-b border-gray-300">{request.author}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {request.AssignTo === 'anyone' ? (
                    <>
                      <select
                        name={`engineer-${request._id}`}
                        style={{ height: '2rem' }}
                        className="engineer-dropdown"
                        value={selectedAssignments[request._id] || ''}
                        onChange={(e) => handleEngineerChange(request._id, e.target.value)}
                      >
                        <option value="">Select an engineer</option>
                        {engineers.map((engineer) => (
                          <option key={engineer._id} value={engineer.username}>
                            {engineer.username}
                          </option>
                        ))}
                      </select>
                      <button
                        className="bg-red-400 rounded-md px-2 py-1 text-white ml-2"
                        onClick={() => assignRequest(request._id)}
                      >
                        Assign
                      </button>
                    </>
                  ) : (
                    <span>{request.AssignTo}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Toaster />
    </div>
  );
};

export default AllRequests;
