const Booking = require('../models/Booking');
const Room = require('../models/Room');


// Check availability: no overlapping bookings
const isAvailable = async (roomId, startTime, endTime, excludeBookingId = null) => {
const query = {
roomId,
$or: [
{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }
]
};
if (excludeBookingId) query._id = { $ne: excludeBookingId };
const overlapping = await Booking.findOne(query);
return !overlapping;
};


module.exports = { isAvailable };