import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig.js";
import User from "../models/User.js";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export function adminMiddleware(req, res, next) {
  if (req.user.role !== "Admin") return res.status(403).json({ message: "Forbidden" });
  next();
}
