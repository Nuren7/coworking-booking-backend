import Room from "../models/Room.js";
import { getRooms, invalidateRoomsCache } from "../services/roomService.js";

// GET /rooms
export async function getAllRooms(req, res) {
  try {
    const rooms = await getRooms();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
}

// POST /rooms
export async function createRoom(req, res) {
  try {
    const room = await Room.create(req.body);
    await invalidateRoomsCache();
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: "Failed to create room" });
  }
}

// PUT /rooms/:id
export async function updateRoom(req, res) {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await invalidateRoomsCache();
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Failed to update room" });
  }
}

// DELETE /rooms/:id
export async function deleteRoom(req, res) {
  try {
    await Room.findByIdAndDelete(req.params.id);
    await invalidateRoomsCache();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete room" });
  }
}
