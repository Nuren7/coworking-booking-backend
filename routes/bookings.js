const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const auth = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { isAvailable } = require('../services/bookingService');
const { notifyBookingCreated, notifyBookingUpdated, notifyBookingDeleted } = require('../services/notificationService');


const router = express.Router();


// Create booking
router.post('/', auth, async (req, res) => {
try {
const { roomId, startTime, endTime } = req.body;
if (!roomId || !startTime || !endTime) return res.status(400).json({ message: 'Missing fields' });
const room = await Room.findById(roomId);
if (!room) return res.status(404).json({ message: 'Room not found' });
const start = new Date(startTime);
const end = new Date(endTime);
if (isNaN(start) || isNaN(end) || start >= end) return res.status(400).json({ message: 'Invalid dates' });


const available = await isAvailable(roomId, start, end);
if (!available) return res.status(409).json({ message: 'Room is already booked for the given period' });


const booking = await Booking.create({ roomId, userId: req.user._id, startTime: start, endTime: end });
// send realtime notification
notifyBookingCreated(req.app.get('io'), req.user._id, booking);

// respond to client
res.status(201).json(booking);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server error' });
}
});

module.exports = router;