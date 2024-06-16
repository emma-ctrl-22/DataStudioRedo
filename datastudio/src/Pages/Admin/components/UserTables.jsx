import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import axios from 'axios';

const UserTables = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/get-users');
        setUsers(response.data); // Assuming the API response returns an array of users
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
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
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
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
