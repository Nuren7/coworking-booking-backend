import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const JWT_EXPIRES = "1d"; // token expires in 1 day
