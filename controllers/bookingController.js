const Booking = require('../models/Booking');
const { isAvailable } = require('../services/bookingService');
const { notifyBookingCreated, notifyBookingUpdated, notifyBookingDeleted } =
  require('../services/notificationService');

exports.createBooking = async (req, res) => {
  const { roomId, startTime, endTime } = req.body;

  const available = await isAvailable(roomId, startTime, endTime);
  if (!available) return res.status(409).json({ message: 'Room unavailable' });

  const booking = await Booking.create({
    roomId,
    userId: req.user._id,
    startTime,
    endTime
  });

  notifyBookingCreated(req.app.get('io'), req.user, booking);
  res.status(201).json(booking);
};
