import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  type: { type: String, enum: ["workspace", "conference"], required: true },
});

export default mongoose.model("Room", roomSchema);
