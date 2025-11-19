import { createBooking, updateBooking, deleteBooking, isAvailable } from "../services/bookingService.js";
import Booking from "../models/Booking.js";

// POST /bookings
export async function createBookingController(req, res) {
  try {
    const { roomId, startTime, endTime } = req.body;

    const available = await isAvailable(roomId, startTime, endTime);
    if (!available) return res.status(409).json({ message: "Room unavailable" });

    const booking = await createBooking({
      roomId,
      userId: req.user._id,
      startTime,
      endTime,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to create booking" });
  }
}

// GET /bookings
export async function getBookingsController(req, res) {
  try {
    let bookings;
    if (req.user.role === "Admin") {
      bookings = await Booking.find();
    } else {
      bookings = await Booking.find({ userId: req.user._id });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
}

// PUT /bookings/:id
export async function updateBookingController(req, res) {
  try {
    const booking = await updateBooking(req.params.id, req.body);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to update booking" });
  }
}

// DELETE /bookings/:id
export async function deleteBookingController(req, res) {
  try {
    await deleteBooking(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
}
