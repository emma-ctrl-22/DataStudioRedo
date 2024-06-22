// src/components/Chat.js
import React, { useEffect, useState, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import UserList from '../components/UserList';
import { AuthContext } from '../Context/AuthContext';

const socket = socketIOClient('http://localhost:8080');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const { userInfo } = useContext(AuthContext);
    const userId = userInfo?.id;

    useEffect(() => {
        if (selectedUser) {
            const fetchMessages = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/chat/history/${userId}/${selectedUser._id}`);
                    setMessages(response.data);
                } catch (error) {
                    console.error("Error fetching chat history:", error);
                }
            };

            fetchMessages();
        }
    }, [userId, selectedUser]);

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            if (message.sender === selectedUser?._id || message.receiver === selectedUser?._id) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [selectedUser]);

    const sendMessage = async () => {
        if (newMessage.trim() && selectedUser) {
            const messageData = { senderId: userId, receiverId: selectedUser._id, message: newMessage };

            try {
                const response = await axios.post('http://localhost:8080/api/chat/send', messageData);
                setMessages((prevMessages) => [...prevMessages, response.data]);
                socket.emit('sendMessage', response.data);
                setNewMessage('');
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div className="flex flex-row h-screen">
            <UserList onSelectUser={setSelectedUser} />
            <div className="flex flex-col w-3/4 p-4">
                {selectedUser ? (
                    <>
                        <h2 className="text-xl font-bold mb-4">Chat with {selectedUser.username}</h2>
                        <div className="flex flex-col-reverse overflow-y-auto h-5/6 mb-4 border rounded-lg p-4">
                            {messages.length > 0 ? messages.map((msg, index) => (
                                <div key={index} className={msg.sender === userId ? 'self-end bg-blue-500 text-white p-2 rounded-lg mb-2' : 'self-start bg-gray-200 p-2 rounded-lg mb-2'}>
                                    <p>{msg.message}</p>
                                    <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                                </div>
                            )) : (
                                <p>Start messaging {selectedUser.name}</p>
                            )}
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-grow p-2 border rounded-l-lg"
                            />
                            <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
                        </div>
                    </>
                ) : (
                    <p className="text-xl">Select a user to start chatting</p>
                )}
            </div>
        </div>
    );
};

export default Chat;
