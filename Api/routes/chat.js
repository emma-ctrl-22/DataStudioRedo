const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Get chat history between two users
router.get('/history/:userId1/:userId2', async (req, res) => {
    const { userId1, userId2 } = req.params;
    
    try {
        const messages = await Chat.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 },
            ],
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        console.error("Error fetching chat history:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to send a message
router.post('/send', async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ error: "Sender or receiver not found" });
        }

        const chatMessage = new Chat({
            sender: senderId,
            receiver: receiverId,
            message,
        });

        await chatMessage.save();

        res.status(201).json(chatMessage);
    } catch (err) {
        console.error("Error sending message:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
