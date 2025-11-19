import { getRooms, invalidateRoomsCache } from "../services/roomService.js";
import Room from "../models/Room.js";

export async function getAllRooms(req, res) {
  try { res.json(await getRooms()); }
  catch (err) { res.status(500).json({ error: err.message }); }
}

export async function createRoom(req, res) {
  try {
    const room = await Room.create(req.body);
    await invalidateRoomsCache();
    res.status(201).json(room);
  } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function updateRoom(req, res) {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await invalidateRoomsCache();
    res.json(room);
  } catch (err) { res.status(500).json({ error: err.message }); }
}

export async function deleteRoom(req, res) {
  try {
    await Room.findByIdAndDelete(req.params.id);
    await invalidateRoomsCache();
    res.status(204).end();
  } catch (err) { res.status(500).json({ error: err.message }); }
}
