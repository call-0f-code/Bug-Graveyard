import mongoose from "mongoose";
const solutionSchema = new mongoose.Schema(
{
  _id: ObjectId,

  bugId: {
    type: ObjectId,
    ref: "Bug",
    required: true,
    index: true
  },

  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  content: {
    explanation: {
      type: String,
      required: true
    },
  codeSnippet: String,
  prUrl: String
  },
  attachments: [
    {
      fileName: String,
      fileUrl: String,   
      fileType: String,  
      fileSize: Number  
    }
  ],
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING",
    index: true
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  createdAt: Date,
  updatedAt: Date
}
);
export default mongoose.model("Solution" , solutionSchema)