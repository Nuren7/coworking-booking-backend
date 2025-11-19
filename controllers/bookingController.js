import { createBooking, updateBooking, deleteBooking, isAvailable } from "../services/bookingService.js";
import Booking from "../models/Booking.js";

export async function createBookingController(req, res) {
  try {
    const { roomId, startTime, endTime } = req.body;
    if (!(await isAvailable(roomId, startTime, endTime))) return res.status(409).json({ message: "Room unavailable" });

    const booking = await createBooking({
      roomId, userId: req.user._id, startTime, endTime
    });

    res.status(201).json(booking);
  } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function getBookingsController(req, res) {
  try {
    const bookings = req.user.role === "Admin"
      ? await Booking.find()
      : await Booking.find({ userId: req.user._id });
    res.json(bookings);
  } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function updateBookingController(req, res) {
  try { res.json(await updateBooking(req.params.id, req.body)); }
  catch (err) { res.status(500).json({ error: err.message }); }
}

export async function deleteBookingController(req, res) {
  try { await deleteBooking(req.params.id); res.status(204).end(); }
  catch (err) { res.status(500).json({ error: err.message }); }
}
