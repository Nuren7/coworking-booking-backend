let io;

export function initSocket(serverIo) {
  io = serverIo;
}

export function sendBookingNotification(booking) {
  if (!io) return;
  io.emit("booking_created", {
    roomId: booking.roomId,
    userId: booking.userId,
    startTime: booking.startTime,
    endTime: booking.endTime,
  });
}
