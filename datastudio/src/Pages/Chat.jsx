import React, { useEffect, useState, useContext, useCallback } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import UserList from "../components/UserList";
import { AuthContext } from "../Context/AuthContext";

const socket = socketIOClient("http://localhost:8080");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const userId = userInfo?.id;

  const fetchMessages = useCallback(async () => {
    if (selectedUser) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/chat/history/${userId}/${selectedUser._id}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    }
  }, [userId, selectedUser]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    const handleMessageReceive = (message) => {
      console.log("Received message:", message);
      if (message.senderId === selectedUser._id || message.receiverId === selectedUser._id) {
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg._id === message._id)) {
            return prevMessages;
          }
          return [...prevMessages, message];
        });
      }
    };
  
    socket.on("receiveMessage", handleMessageReceive);
  
    return () => {
      socket.off("receiveMessage", handleMessageReceive);
    };
  }, [selectedUser]);  

  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      const messageData = {
        senderId: userId,
        receiverId: selectedUser._id,
        message: newMessage,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/api/chat/send",
          messageData
        );
        setMessages((prevMessages) => [...prevMessages, response.data]);
        socket.emit("sendMessage", response.data);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-row h-screen bg-gray-900 text-white">
      <div className="flex flex-col w-3/4 p-4 h-full">
        {selectedUser ? (
          <>
            <div>
              <h2 className="text-xl font-bold mb-4">
                {selectedUser.username}
              </h2>
            </div>
            <div className="flex flex-col overflow-y-auto h-5/6 mb-4 border border-gray-700 rounded-lg p-4 bg-gray-800">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`px-5  mb-2  rounded-t-md  ${
                      msg.sender === userId
                        ? "self-end bg-blue-600 text-white rounded-bl-md"
                        : "self-start bg-white text-black rounded-br-md"
                    }`}
                  >
                    <p className="mb-0">{msg.message}</p>
                    <small>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </small>
                  </div>
                ))
              ) : (
                <p>Start messaging {selectedUser.name}</p>
              )}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 border border-gray-700 rounded-l-lg bg-gray-800 text-white"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white p-2 rounded-r-lg"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-xl">Select a user to start chatting</p>
        )}
      </div>
      <UserList onSelectUser={setSelectedUser} />
    </div>
  );
};

export default Chat;
