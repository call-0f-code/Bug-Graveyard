import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    type: {
      type: String,
      enum: [
        "NEW_SOLUTION",
        "SOLUTION_ACCEPTED",
        "COINS_RECEIVED",
        "BUG_CLOSED",
        "REPORT_UPDATE"
      ],
      required: true
    },

    reference: {
      bugId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bug"
      },
      solutionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solution"
      }
    },

    message: {
      type: String,
      required: true
    },

    read: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Notification", notificationSchema);