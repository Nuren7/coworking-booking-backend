import Booking from "../models/Booking.js";
import redisClient from "../config/redisClient.js";
import { sendBookingNotification } from "./notificationService.js";

export async function isAvailable(roomId, startTime, endTime) {
  const overlapping = await Booking.findOne({
    roomId,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $lte: endTime, $gt: startTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
    ],
  });
  return !overlapping;
}

export async function createBooking(data) {
  const booking = await Booking.create(data);
  await redisClient.del("rooms");
  sendBookingNotification(booking);
  return booking;
}

export async function updateBooking(id, data) {
  const booking = await Booking.findByIdAndUpdate(id, data, { new: true });
  await redisClient.del("rooms");
  sendBookingNotification(booking);
  return booking;
}

export async function deleteBooking(id) {
  const booking = await Booking.findByIdAndDelete(id);
  await redisClient.del("rooms");
  io?.emit("booking_deleted", { bookingId: id });
  return booking;
}
