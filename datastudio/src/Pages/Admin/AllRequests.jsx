import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";

const fakeRequests = [
  { _id: "1", title: "Request 1", type: "CM Report", author: "Author 1" },
  { _id: "2", title: "Request 2", type: "PM Report", author: "Author 2" },
  { _id: "3", title: "Request 3", type: "PPM Report", author: "Author 3" },
  { _id: "4", title: "Request 4", type: "CM Report", author: "Author 4" },
  { _id: "5", title: "Request 5", type: "PM Report", author: "Author 5" },
  { _id: "6", title: "Request 6", type: "PPM Report", author: "Author 6" },
];

const fakeEngineers = [
  { _id: "1", username: "Engineer 1" },
  { _id: "2", username: "Engineer 2" },
  { _id: "3", username: "Engineer 3" },
];

const AllRequests = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setRequests(fakeRequests);
      setEngineers(fakeEngineers);
      setLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);

  const assignRequest = async (engineerUsername, requestId) => {
    try {
      // Simulate an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(
        `Assigning request ${requestId} to engineer ${engineerUsername}`
      );
      toast.promise(
        async () => {
          await assignRequest(engineerUsername, requestId);
          return 'Request assigned successfully';
        },
        {
          loading: 'Assigning request...',
          success: (msg) => msg,
          error: 'Error assigning request',
        }
      );
      setUpdateCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error assigning request', error);
      toast.error('Error assigning request');
    }
  };
  

  return (
    <div className="px-6">
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
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Title
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Type
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Author
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Assign To
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="even:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300">
                  {request.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {request.type}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {request.author}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <select
                    name="engineer"
                    style={{ height: "2rem" }}
                    id={`engineer-${request._id}`}
                    className="engineer-dropdown"
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
                    onClick={() =>
                      assignRequest(
                        document.getElementById(`engineer-${request._id}`)
                          .value,
                        request._id
                      )
                    }
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Toaster/>
    </div>
  );
};

export default AllRequests;
