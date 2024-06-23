import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:8080");

const UserList = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { userInfo } = useContext(AuthContext);

    const role = userInfo?.role;
    const username = userInfo?.username;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/get-users');
                let filteredUsers = response.data;
                
                if (role === 'admin') {
                    filteredUsers = filteredUsers.filter(user => user.role === 'engineer' || user.role === 'client');
                } else if (role === 'engineer') {
                    filteredUsers = filteredUsers.filter(user => user.role === 'engineer' || user.role === 'admin');
                } else if (role === 'client') {
                    filteredUsers = filteredUsers.filter(user => user.role === 'admin');
                }
                
                if (filteredUsers.some(user => user.username === username)) {
                    filteredUsers = filteredUsers.filter(user => user.username !== username);
                }

                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [role, username]);

    useEffect(() => {
        socket.emit('userConnected', userInfo?.id);

        socket.on('updateUserStatus', ({ userId, status }) => {
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user._id === userId ? { ...user, status } : user
                )
            );
        });

        return () => {
            socket.off('updateUserStatus');
        };
    }, [userInfo]);

    const handleUserClick = (user) => {
        setSelectedUserId(user._id);
        onSelectUser(user);
    };

    return (
        <div className="flex flex-col w-1/4 p-4 border-r border-gray-700 h-full">
            <h2 className="text-xl font-bold mb-4">User List</h2>
            {users.length > 0 ? (
                users.map((user) => (
                    <div 
                        key={user._id} 
                        onClick={() => handleUserClick(user)}
                        className={`p-2 cursor-pointer ${selectedUserId === user._id ? 'bg-gray-700' : ''}`}
                    >
                        <span className={`mr-2 ${user.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                            ●
                        </span>
                        {user.username} - <small>{user.role}</small>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default UserList;
