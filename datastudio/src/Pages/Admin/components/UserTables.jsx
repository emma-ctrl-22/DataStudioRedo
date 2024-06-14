import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const fakeUsers = [
  { username: 'JohnDoe', email: 'johndoe@example.com', phone: '123-456-7890', role: 'Admin' },
  { username: 'JaneSmith', email: 'janesmith@example.com', phone: '987-654-3210', role: 'User' },
  { username: 'MikeBrown', email: 'mikebrown@example.com', phone: '555-555-5555', role: 'Manager' },
];

const UserTables = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUsers(fakeUsers);
      setLoading(false);
    }, 2000); // Simulating a network request
  }, []);

  return (
    <div className="p-4 w-full">
      {loading ? (
        <Box>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" height={60} />
        </Box>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-500 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Username</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Email</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Phone</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-300">{user.username}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.phone}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTables;
