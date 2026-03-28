import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema(
  {
  _id: ObjectId,

  name: {
    type: String,
    unique: true,
    required: true
  },
  icon: {
    url: String,
    type: String,        
 },

  description: String,
  criteria: {
    type:{
      type: String, 
      enum: ["BUGS_POSTED", "BUGS_SOLVED", "SOLUTION_ACCEPTED", "SUCCESS_RATE", "COINS_EARNED"],
      required: true 
    }, 
    threshold:{ type: Number , required: true }
  }
}
);

export default mongoose.model("Badge", badgeSchema)