import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectRedis } from "./config/redisClient.js";
import { initSocket } from "./services/notificationService.js";

import authRoutes from "./routes/auth.js";
import roomRoutes from "./routes/rooms.js";
import bookingRoutes from "./routes/bookings.js";
import "./config/db.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", socket => console.log("Client connected:", socket.id));

// Inject io into notification service
initSocket(io);

// Connect Redis
await connectRedis();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
