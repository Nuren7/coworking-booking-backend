import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES } from "../config/jwtConfig.js";

export async function registerUser(username, password, role = "User") {
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, role });
  return user;
}

export async function loginUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return { user, token };
}
