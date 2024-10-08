const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

router.get('/', (req, res) => {
    res.send('Auth Home');
});

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, phone, role, password } = req.body;

    if (!username || !email || !phone || !role || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            phone,
            role,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Return user info along with the token
        const userInfo = {
            id: user._id,
            email: user.email,
            role: user.role,
            username: user.username // Assuming you have a username field in your User model
            // Add other fields as needed
        };

        res.status(200).json({ message: 'Login successful', token, 
        role: user.role,
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
