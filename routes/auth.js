const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');


const router = express.Router();


// Register
router.post('/register', async (req, res) => {
try {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'username and password required' });
const existing = await User.findOne({ username });
if (existing) return res.status(400).json({ message: 'username taken' });
const hashed = await bcrypt.hash(password, 10);
const user = await User.create({ username, password: hashed });
res.status(201).json({ id: user._id, username: user.username });
} catch (err) {
logger.error('Register error', err);
res.status(500).json({ message: 'Server error' });
}
});


// Login
router.post('/login', async (req, res) => {
try {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'username and password required' });
const user = await User.findOne({ username });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
res.json({ token });
} catch (err) {
logger.error('Login error', err);
res.status(500).json({ message: 'Server error' });
}
});


module.exports = router;