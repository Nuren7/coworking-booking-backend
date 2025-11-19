import { io } from "../server.js";

// Send booking created notification
export function sendBookingNotification(booking) {
  io.emit("booking_created", {
    roomId: booking.roomId,
    userId: booking.userId,
    startTime: booking.startTime,
    endTime: booking.endTime,
  });
}
