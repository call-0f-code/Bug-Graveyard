import mongoose from "mongoose";

const vectorSchema = new mongoose.Schema(
{
  _id: ObjectId,

  bugId: {
    type: ObjectId,
    ref: "Bug",
    unique: true,
    index: true,
    required: true
  },

  vector: {
    type: [Number],
    required: true
  },

  modelVersion: String,
  updatedAt: Date
}
);

export default mongoose.model("Vector", vectorSchema);