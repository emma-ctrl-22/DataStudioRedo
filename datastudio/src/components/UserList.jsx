// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/get-users');
                setUsers(response.data);
                console.log(response.data); // Log the response data to the console to check if it's working
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="w-1/4 p-4 border-r bg-blue-600">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id} onClick={() => onSelectUser(user)} className="cursor-pointer mb-2 p-2 rounded-lg hover:bg-gray-200">
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
