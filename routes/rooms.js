import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import { getAllRooms, createRoom, updateRoom, deleteRoom } from "../controllers/roomController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllRooms);
router.post("/", authMiddleware, adminMiddleware, createRoom);
router.put("/:id", authMiddleware, adminMiddleware, updateRoom);
router.delete("/:id", authMiddleware, adminMiddleware, deleteRoom);

export default router;
