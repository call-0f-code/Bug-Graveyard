import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
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
    required: true
  },

  content: {
    type: String,
    required: true
  },
  parentCommentId: {
    type: ObjectId,
    ref: "Comment",
    default: null
  },

  isEdited: {
    type: Boolean,
    default: false
  },
}
);
export default mongoose.model("Comment", commentSchema);