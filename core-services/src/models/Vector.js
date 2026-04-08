const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const vectorSchema = new mongoose.Schema({
  _id: ObjectId,
  bugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bug",
    unique: true,
    index: true,
    required: true
  },
  vector: {
    type: [Number],
    required: true
  },
  modelVersion: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Vector", vectorSchema);