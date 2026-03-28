
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
  _id: ObjectId,

  reportedUserId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  reportedBy: {
    type: ObjectId,
    ref: "User",
    required: true
  },

  bugId: {
    type: ObjectId,
    ref: "Bug",
    index: true
  },

  reason: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "UNDER_REVIEW", "RESOLVED", "REJECTED"],
    default: "PENDING",
    index: true
  },
  adminNote: String,
  createdAt: Date,
  updatedAt: Date
  }
);
reportSchema.index(
    {reportedBy: 1, bugId: 1},
    {unique: true, sparse: true}
);

const Report = mongoose.model("Report", reportSchema);

export default Report;