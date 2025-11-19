import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createBookingController, getBookingsController, updateBookingController, deleteBookingController } from "../controllers/bookingController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getBookingsController);
router.post("/", createBookingController);
router.put("/:id", updateBookingController);
router.delete("/:id", deleteBookingController);

export default router;
