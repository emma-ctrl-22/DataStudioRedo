const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors package
const http = require('http'); // Required for socket.io
const { Server } = require('socket.io'); // Import socket.io
const clientRouter = require('./routes/client');
const adminRouter = require('./routes/admin');
const engineerRouter = require('./routes/engineer');
const authRouter = require('./routes/auth');
const connectDB = require('./db');
const chatRouter = require('./routes/chat');
const port = 8080;

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for requests from port 5173
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup the logger to use 'combined' format and write logs to access.log
app.use(morgan('combined', { stream: accessLogStream }));

// Setup the router
const router = express.Router();
router.use('/client', clientRouter);
router.use('/admin', adminRouter);
router.use('/engineer', engineerRouter);
router.use('/auth', authRouter);
router.use('/chat', chatRouter);

app.use('/api', router);

const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow requests from this origin
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('sendMessage', async ({ sender, receiver, message }) => {
        const chatMessage = new Chat({ sender, receiver, message });
        await chatMessage.save();
        
        io.to(receiver).emit('receiveMessage', chatMessage);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
