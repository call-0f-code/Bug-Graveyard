import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      index: true,
      required: true
    },
    availableBalance: {
      type: Number,
      default: 0,
      min: 0
    },
    lockedBalance: {
      type: Number,
      default: 0,
      min: 0
    },
  },
  {
    timestamps: true
  }
);
walletSchema.virtual("totalBalance").get(function () {
  return this.availableBalance + this.lockedBalance;
});

export default mongoose.model("Wallet", walletSchema);