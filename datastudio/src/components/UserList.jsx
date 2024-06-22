// src/components/UserList.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const UserList = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { userInfo } = useContext(AuthContext);

    const role = userInfo?.role;

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

    const filteredUsers = users.filter(user => {
        if (role === 'admin') {
            return user.role === 'client' || user.role === 'engineer';
        } else if (role === 'client') {
            return user.role === 'admin';
        } else if (role === 'engineer') {
            return user.role === 'admin' || user.role === 'engineer';
        }
        return false;
    });

    const handleUserClick = (user) => {
        setSelectedUserId(user._id);
        onSelectUser(user);
    };

    return (
        <div className="w-1/4 p-4 border-r bg-gray-800 text-white overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <ul className="h-full overflow-y-auto">
                {filteredUsers.map(user => (
                    <li 
                        key={user._id} 
                        onClick={() => handleUserClick(user)} 
                        className={`cursor-pointer mb-2 p-2 rounded-lg hover:bg-blue-700 ${selectedUserId === user._id ? 'bg-blue-600' : 'bg-gray-900'}`}
                    >
                        {user.username} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
