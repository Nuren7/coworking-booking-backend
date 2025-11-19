exports.notifyBookingCreated = (io, user, booking) => {
  io?.to(String(user._id)).emit('booking:created', booking);
};

exports.notifyBookingUpdated = (io, user, booking) => {
  io?.to(String(user._id)).emit('booking:updated', booking);
};

exports.notifyBookingDeleted = (io, user, booking) => {
  io?.to(String(user._id)).emit('booking:deleted', booking);
};
