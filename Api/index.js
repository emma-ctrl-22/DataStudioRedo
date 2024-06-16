const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors package
const clientRouter = require('./routes/client');
const adminRouter = require('./routes/admin');
const engineerRouter = require('./routes/engineer');
const authRouter = require('./routes/auth');
const connectDB = require('./db');

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup the logger to use 'combined' format and write logs to access.log
app.use(morgan('combined', { stream: accessLogStream }));

// Enable CORS for requests from port 5173
app.use(cors({ origin: 'http://localhost:5173' }));

// Setup the router
const router = express.Router();
router.use('/client', clientRouter);
router.use('/admin', adminRouter);
router.use('/engineer', engineerRouter);
router.use('/auth', authRouter);

app.use('/api', router);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
