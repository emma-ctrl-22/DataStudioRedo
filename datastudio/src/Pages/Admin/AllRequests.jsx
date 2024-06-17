import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AllRequests = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState('');

  useEffect(() => {
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

    fetchRequestsAndEngineers();
  }, []);

  const assignRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/admin/assign-request/${selectedRequestId}`, {
        engineerUsername: selectedEngineer,
      });

      toast.promise(
        async () => {
          // Update the request locally
          const updatedRequests = requests.map((request) =>
            request._id === selectedRequestId ? { ...request, AssignTo: selectedEngineer } : request
          );
          setRequests(updatedRequests);

          return 'Request assigned successfully';
        },
        {
          loading: 'Assigning request...',
          success: (msg) => {
            console.log(msg);
            return msg;
          },
          error: (err) => {
            console.error('Error assigning request:', err);
            return 'Error assigning request';
          },
        }
      );
    } catch (error) {
      console.error('Error assigning request:', error);
      toast.error('Error assigning request');
    }
  };

  return (
    <div style={{fontFamily:"Montserrat"}} className="px-6">
      <div className="mt-3 mx-3 rounded-md">
        <h1 className="text-md text-left text-red-500 mb-3 ">
          <span className="bg-red-100 p-1 rounded-md">All Requests</span>
        </h1>
      </div>
      {loading ? (
        <Box>
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
      ) : (
        <table className="w-full bg-white border border-gray-300 rounded-lg mt-8 ">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Title</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Type</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Author</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Assign To</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="even:bg-gray-50">
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
                        value={selectedEngineer}
                        onChange={(e) => setSelectedEngineer(e.target.value)}
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
                        onClick={() => {
                          setSelectedRequestId(request._id);
                          assignRequest();
                        }}
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
