import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
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
        "PURCHASE",        
        "LOCK",            
        "UNLOCK",          
        "TRANSFER_OUT",    
        "TRANSFER_IN",    
        "WITHDRAWAL",      
        "PENALTY"          
      ],
      required: true,
      index: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
      index: true
    },
    bugId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bug",
      index: true
    },
    solutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solution"
    },
    counterpartUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    payment: {
      provider: String,   
      paymentId: String,
      orderId: String
    },
    metadata: {
      reason: String,     
      note: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Transaction", transactionSchema);