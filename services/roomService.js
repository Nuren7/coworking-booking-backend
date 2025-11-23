import Room from "../models/Room.js";
import redisClient from "../config/redisClient.js";

export async function getRooms() {
  const cached = await redisClient.get("rooms");
  if (cached) return JSON.parse(cached);

  const rooms = await Room.find();
  await redisClient.setEx("rooms", 1800, JSON.stringify(rooms));
  return rooms;
}

export async function invalidateRoomsCache() {
  await redisClient.del("rooms");
}
